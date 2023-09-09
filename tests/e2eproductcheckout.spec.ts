import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import ProductsPage from '../pages/product.page';
import ShoppingCartDetailsPage from '../pages/shoppingCartDetails.page'
import CheckoutPage from '../pages/checkout.page';

test.describe('E2E checkout', () => {

    let loginPage: LoginPage;
    let productpage: ProductsPage;
    let shoppingCartDetailsPage: ShoppingCartDetailsPage;
    let checkOutPage: CheckoutPage;

    test('@Regression E2E product checkout', async ({ page }) => {
        loginPage = new LoginPage(page);
        productpage = new ProductsPage(page);
        shoppingCartDetailsPage = new ShoppingCartDetailsPage(page);
        checkOutPage = new CheckoutPage(page);
        await loginPage.navigation();
        await expect(page).toHaveTitle('Swag Labs');

        await loginPage.inputUserCred('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
        await expect(loginPage.productPageTitle).toHaveText('Products');

        const isSorted = await productpage.sortProductWithValue('Price (high to low)');
        expect(isSorted).toBe(true);

        await productpage.addProductToMyCart('Sauce Labs Fleece Jacket');
        await expect(productpage.productRemoveButton).toBeVisible();
        await productpage.addProductToMyCartFromProductDetailsPage('Test.allTheThings() T-Shirt (Red)');
        await expect(productpage.productRemoveButton).toBeVisible();
        await expect(productpage.shoppingCartBadge).toHaveText('2');

        await productpage.shoppingCartDetailsPgae.click();

        const expectedProduct = [
            "Sauce Labs Fleece Jacket",
            "Test.allTheThings() T-Shirt (Red)",
        ];

        expect(await shoppingCartDetailsPage.products.allTextContents()).toEqual(expectedProduct);
        await shoppingCartDetailsPage.checkOutButton.click();
        await expect(checkOutPage.pageTitle).toHaveText('Checkout: Your Information');
        await page.pause();


    })

})