import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const context  = await browser.newContext();
    const page = await browser.newPage();

    await page.goto('https://www.saucedemo.com/v1')

    // Not-login-state
    await page.context().storageState({path:'not-loggedin-state.json'});

    await page.locator('#user-name').type('standard_user');
    await page.locator('#password').type('secret_sauce');
    await page.locator('#login-button').click();

    await page.context().storageState({path:'login-state.json'});
    await browser.close();

}
export default globalSetup