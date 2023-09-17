import { chromium, FullConfig } from "@playwright/test";
import { ENV_VAR } from "./env_var";

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const context  = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/v1')

    // Not-login-state
    await page.context().storageState({path:'not-loggedin-state.json'});

    await page.locator('#user-name').waitFor({timeout:7000});
    await page.locator('#user-name').type(`${ENV_VAR.USERNAME}`);
    await page.locator('#password').type(`${ENV_VAR.PASSWORD}`);
    await page.locator('#login-button').click();

    await page.context().storageState({path:'login-state.json'});
    await browser.close();

}
export default globalSetup