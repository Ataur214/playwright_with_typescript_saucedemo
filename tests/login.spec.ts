import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';

test.describe('login page', () => {
    let loginPage: LoginPage;
    test('Navigae to login page and verify title', async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigation();
        await expect(page).toHaveTitle('Swag Labs');
    })

    test('Verify user can login with valid credentials', async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigation();
        await loginPage.inputUserCred('standard_user','secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
        await expect(loginPage.productPageTitle).toHaveText('Products');
    })

    test("Verify user can't login with invalid credentials", async ({ page }) => {
        let errorText = 'Username and password do not match any user in this service';
        loginPage = new LoginPage(page);
        await loginPage.navigation();
        await loginPage.inputUserCred('standard_user','test');
        expect(await loginPage.invalidLoginErrorMessage()).toContain(errorText);
    })

})
