import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import ProductsPage from '../pages/product.page';
import ShoppingCartDetailsPage from '../pages/shoppingCartDetails.page'
import CheckoutPage from '../pages/checkout.page';
import CheckOutOverviewPage from '../pages/checkoutOverview.page';
import dataset from '../resources/dataset.json';
import userproduct from '../resources/dataset.json';


for (const data of dataset.userCred) {

    test.describe('E2E checkout', () => {

        let loginPage: LoginPage;
        let productpage: ProductsPage;
        let shoppingCartDetailsPage: ShoppingCartDetailsPage;
        let checkOutPage: CheckoutPage;
        let checkOutOverviewPage: CheckOutOverviewPage;

        test(`@Regression E2E product checkou test ${data.userName}`, async ({ page }) => {
            loginPage = new LoginPage(page);
            productpage = new ProductsPage(page);
            shoppingCartDetailsPage = new ShoppingCartDetailsPage(page);
            checkOutPage = new CheckoutPage(page);
            checkOutOverviewPage = new CheckOutOverviewPage(page);
            await loginPage.navigation();
            await expect(page).toHaveTitle('Swag Labs');

            await loginPage.inputUserCred(data.userName, data.userPass);
            await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
            await expect(loginPage.productPageTitle).toHaveText('Products');

            const isSorted = await productpage.sortProductWithValue('Price (high to low)');
            expect(isSorted).toBe(true);

            await productpage.addProductToMyCart("Sauce Labs Fleece Jacket");
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

            await checkOutPage.fillUpChekOutForm('test', 'test', '1230');
            await checkOutPage.continueButton.click();

            await expect(checkOutOverviewPage.checkoutPageTitle).toHaveText('Checkout: Overview');
            expect(await checkOutOverviewPage.products.allTextContents()).toEqual(expectedProduct);

            const actualSubTotal = await checkOutOverviewPage.orderSummeryCalculation();
            const expectedSubTotal = await checkOutOverviewPage.expectedSubTotal();
            expect(actualSubTotal).toEqual(expectedSubTotal);

            await checkOutOverviewPage.finishButton.click();
            await expect(checkOutOverviewPage.oderSuccessMessage).toHaveText('THANK YOU FOR YOUR ORDER');

        })

    })

}