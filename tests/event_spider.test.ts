import { draft_law_request_spider } from "../src/event_spider"
import { Page } from "puppeteer";
import { DraftLawRequest, DraftLawRequestStatus } from "../src/event_protocol/event";
describe('draft_law_request_spider', () => {
    test("should ok", async () => {
        const res = await draft_law_request_spider();
        console.log('res', res);
    }, 1000 * 60 * 60)
})
