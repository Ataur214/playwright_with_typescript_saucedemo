import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login.page';
import ProductsPage from '../pages/product.page';
import { faker } from '@faker-js/faker';

test.describe('login page', () => {
    let loginPage: LoginPage;
    let productpage: ProductsPage;
    test.describe('Login state test', () => {
        test.use({storageState:'not-loggedin-state.json'});

        test('@smoke Navigae to login page and verify title', async ({ page }) => {
            loginPage = new LoginPage(page);
            await page.goto('/v1');
            await page.pause();
            await loginPage.inputUserCred('standard_user','secret_sauce');
            await expect(page).toHaveTitle('Swag Labs');
        })
        
    })

    test('Verify sorting is working fine with Price (high to low)',async ({page})=>{
        productpage = new ProductsPage(page);
        await page.goto('/v1/inventory.html')
        const isSorted = await productpage.sortProductWithValue('Price (high to low)');
        expect(isSorted).toBe(true);
    })

    test('Verify sorting is working fine with Price (low to high)',async ({page})=>{
        productpage = new ProductsPage(page);
        await page.goto('/v1/inventory.html')
        const isSorted = await productpage.sortProductWithValue('Price (low to high)');
        expect(isSorted).toBe(true);
    })

    test('Verify user can add product to the shopping cart',async ({page})=>{
        productpage = new ProductsPage(page);
        await page.goto('/v1/inventory.html')
        await productpage.addProductToMyCart('Sauce Labs Fleece Jacket');
        await expect(productpage.productRemoveButton).toBeVisible();
        await productpage.addProductToMyCartFromProductDetailsPage('Test.allTheThings() T-Shirt (Red)');
        await expect(productpage.productRemoveButton).toBeVisible();
        await expect(productpage.shoppingCartBadge).toHaveText('2');
    })
})
