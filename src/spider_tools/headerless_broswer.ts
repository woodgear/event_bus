import * as puppeteer from 'puppeteer';
import { Page } from 'puppeteer';

interface PuppeteerParser<T> {
    (page: Page): T
}

export async function puppetee_runner<T>(url: string, parser: PuppeteerParser<T>): Promise<T> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    let ret = await parser(page)
    await browser.close();
    return ret;
}
