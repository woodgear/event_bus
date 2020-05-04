import { draft_law_request_spider } from "./event_spider"
import { DraftLawRequest } from "./event_protocol/event"
import * as fs from "fs"
interface GlobalState {
    copyRight: { status: DraftLawRequest, update_time: String }
}

interface DraftLawRequestEvent {
    name: String,
    data: DraftLawRequest,
    update_time: String
}

interface SimpleReact {
    update(event: DraftLawRequestEvent): void
    noChagne(): void
    render(state: GlobalState): void
}

function appendLog(msg:String) {
    fs.appendFileSync("./event.log",msg+"\n\r")
}

class SimpleTui {
    state: GlobalState
    constructor() {
        this.state = {} as GlobalState
    }
    update(event: DraftLawRequestEvent) {
        appendLog(JSON.stringify(event))
        if (event.name == "copyright") {
            this.state.copyRight = { status: event.data, update_time: event.update_time }
        }
        this.render(this.state)
    }

    render(state: GlobalState) {
        process.stdout.write("\u001b[2J\u001b[0;0H");
        let draft = state.copyRight.status;
        let time = state.copyRight.update_time;
        console.log(`${draft.name} ${draft.people_count} ${draft.opinion_count} ${time}`)
    }
}




const tui = new (SimpleTui)

async function main() {
    let event = {
        name: "copyright",
        data: await copyrightDraftLaw(),
        update_time: new Date().toLocaleString()
    }
    tui.update(event)
}

async function copyrightDraftLaw(): Promise<DraftLawRequest> {
    let laws = await draft_law_request_spider()
    return laws.find((e) => e.name.includes("著作权"))
}

main()
setInterval(() => {
    main()
}, 1000 * 60)