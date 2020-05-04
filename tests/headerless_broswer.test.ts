import { puppetee_runner} from "../src/spider_tools/headerless_broswer"
import {Page} from "puppeteer";
describe('puppetee_runner', () => {
    test("should ok",async()=>{
        interface Link {
            name:String,
            link:String
        }
        let mock_parser = async function (page:Page): Promise<Array<Link>> {
            let ret = await page.evaluate(()=>{
               return Array.from(document.getElementById("head").childNodes[2].childNodes).map((a:HTMLAnchorElement)=>{return {name:a.text,link:a.href}})
            })
            return ret
        };
        let res  = await puppetee_runner("http://www.baidu.com",mock_parser);
        expect(res.map((e)=>e.name)).toContain("贴吧")

    },1000 * 60*60)
})
