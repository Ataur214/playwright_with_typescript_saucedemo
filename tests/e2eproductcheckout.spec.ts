import { expect } from '@playwright/test';
import { test } from '../base/init';
//import ProductsPage from '../pages/product.page';
//import ShoppingCartDetailsPage from '../pages/shoppingCartDetails.page'
//import CheckoutPage from '../pages/checkout.page';
//import CheckOutOverviewPage from '../pages/checkoutOverview.page';
import dataset from '../resources/dataset.json';
import userproduct from '../resources/dataset.json';
import { faker } from '@faker-js/faker';


for (const data of dataset.userCred) {

    test.describe('E2E checkout', () => {

        test(`@Regression E2E product checkou test ${data.userName}`, async (
            { loginPage, productPage, shoppingCartDetails, checkoutPage, checkoutOverview, page }) => {

            await loginPage.navigation();
            await expect(page).toHaveTitle('Swag Labs');

            await loginPage.inputUserCred(data.userName, data.userPass);
            await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
            await expect(loginPage.productPageTitle).toHaveText('Products');

            const isSorted = await productPage.sortProductWithValue('Price (high to low)');
            expect(isSorted).toBe(true);

            await productPage.addProductToMyCart("Sauce Labs Fleece Jacket");
            await expect(productPage.productRemoveButton).toBeVisible();
            await productPage.addProductToMyCartFromProductDetailsPage('Test.allTheThings() T-Shirt (Red)');
            await expect(productPage.productRemoveButton).toBeVisible();
            await expect(productPage.shoppingCartBadge).toHaveText('2');

            await productPage.shoppingCartDetailsPgae.click();

            const expectedProduct = [
                "Sauce Labs Fleece Jacket",
                "Test.allTheThings() T-Shirt (Red)",
            ];

            expect(await shoppingCartDetails.products.allTextContents()).toEqual(expectedProduct);
            await shoppingCartDetails.checkOutButton.click();
            await expect(checkoutPage.pageTitle).toHaveText('Checkout: Your Information');

            await checkoutPage.fillUpChekOutForm(faker.person.firstName(), faker.person.lastName(), faker.location.zipCode());
            await page.pause();
            await checkoutPage.continueButton.click();

            await expect(checkoutOverview.checkoutPageTitle).toHaveText('Checkout: Overview');
            expect(await checkoutOverview.products.allTextContents()).toEqual(expectedProduct);

            const actualSubTotal = await checkoutOverview.orderSummeryCalculation();
            const expectedSubTotal = await checkoutOverview.expectedSubTotal();
            expect(actualSubTotal).toEqual(expectedSubTotal);

            await checkoutOverview.finishButton.click();
            await expect(checkoutOverview.oderSuccessMessage).toHaveText('THANK YOU FOR YOUR ORDER');

        })

    })

}