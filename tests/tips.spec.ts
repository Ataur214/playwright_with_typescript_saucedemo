import { test, expect, chromium } from "@playwright/test"
import { GetRandomNumber } from "../utils/data_helper";

test("Tips and Tricks - Testinfo", async ({ page }, Testinfo) => {
    await page.goto('example.com');
    console.log(Testinfo.title)
})

test('Tips and Tricks - Skip specific browser', async ({ page, browserName }) => {
    test.skip(browserName == 'chromium', 'skip it on chromium');
    await page.goto('example.com')

})

test('Tips and Tricks - fixme to skip it', async ({ page, browserName }) => {
    test.fixme(browserName == 'chromium', 'skip it on chromium');
    await page.goto('example.com')

})

test.describe("Tips and Tricks - Overwright the url", async () => {
    test.use({ baseURL: 'https://www.saucedemo.com/v1' });
    test('Tips and Tricks - Overwright the url', async ({ page, browserName }) => {
        await page.goto('example.com')
    })

    test("Tips and Tricks - Mouse Movement", async ({ page }) => {
        await page.pause();
        await page.goto('https://www.saucedemo.com/v1');
        await page.mouse.move(100, 200);
        await page.mouse.up();
        await page.mouse.down();
        await page.mouse.move(200, 100)

    })

    test.only("Tips and Tricks - Multiple tabs on a browser", async ({ browser }) => {
        const context = await browser.newContext();
        const page1 = await context.newPage();
        const page2 = await context.newPage();
        const page3 = await context.newPage();

        await page1.goto("https://www.saucedemo.com/v1")
        await page2.goto("https://www.saucedemo.com/v1")
        await page3.goto("https://www.saucedemo.com/v1")
        console.log(await GetRandomNumber());
    })
})

