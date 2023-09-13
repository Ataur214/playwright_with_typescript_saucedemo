import {expect } from '@playwright/test';
import {test} from '../base/init'
//import { LoginPage } from '../pages/login.page';
//import LoginPage from '../pages/login.page';

test.describe('login page', () => {

    test.beforeEach(async ({loginPage})=>{
        await loginPage.navigation();
    })
    
    test('@smoke Navigae to login page and verify title', async ({ loginPage, page }) => {
        await expect(page).toHaveTitle('Swag Labs');
    })

    test('@smoke Verify user can login with valid credentials', async ({ loginPage,page }) => {
        await loginPage.inputUserCred('standard_user','secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
        await expect(loginPage.productPageTitle).toHaveText('Products');
    })

    test("@smoke Verify user can't login with invalid credentials", async ({loginPage }) => {
        let errorText = 'Username and password do not match any user in this service';
        await loginPage.inputUserCred('standard_user','test');
        expect(await loginPage.invalidLoginErrorMessage()).toContain(errorText);
    })

})
