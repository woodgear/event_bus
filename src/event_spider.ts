import { DraftLawRequest, DraftLawRequestStatus } from "./event_protocol/event"
import { puppetee_runner } from "./spider_tools/headerless_broswer"


export async function draft_law_request_spider(): Promise<Array<DraftLawRequest>> {
    console.log('draft_law_request_spider');
    let ret = await puppetee_runner("http://www.npc.gov.cn/flcaw/", async (page) => {
        await page.waitForFunction(`document.getElementById("beingList").childNodes.length>3`);
        let ret = await page.evaluate(() => {
            let table = Array.from(document.getElementById("beingList").childNodes).slice(3) as Array<HTMLTableRowElement>;
            let data: Array<DraftLawRequest> = table.map(e => {
                console.log('ee', e.cells[0].innerText, e.cells[1].innerText, e.cells[2].innerText, e.cells[3].innerText);
                let event = {
                    name: e.cells[0].innerText,
                    time_range: e.cells[1].innerText,
                    people_count: parseInt(e.cells[2].innerText),
                    opinion_count: parseInt(e.cells[3].innerText),
                    status: "Active" as DraftLawRequestStatus
                }
                return event
            })
            return data
        });
        return ret
    });
    return ret;
}