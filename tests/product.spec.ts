import { test,expect, Page } from "@playwright/test";
import ProductsPage from '../pages/product.page';
import {LoginPage} from "../pages/login.page";

test.describe.serial('Product Page', ()=>{
    let productpage: ProductsPage;
    let loginPage: LoginPage;
    let page:Page;

    test.beforeAll(async ({browser})=>{
        page = await browser.newPage();
        productpage = new ProductsPage(page);
        loginPage = new LoginPage(page);
        await loginPage.navigation();
        await loginPage.inputUserCred('standard_user','secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
        await expect(productpage.productPageTitle).toHaveText('Products');
        
    })

    test('Verify sorting is working fine with Price (high to low)',async ()=>{
        //productpage = new ProductsPage(page);
        //await productpage.navigation();
        const isSorted = await productpage.sortProductWithValue('Price (high to low)');
        expect(isSorted).toBe(true);
    })

    test('Verify sorting is working fine with Price (low to high)',async ()=>{
        //productpage = new ProductsPage(page);
        //await productpage.navigation();
        const isSorted = await productpage.sortProductWithValue('Price (low to high)');
        expect(isSorted).toBe(true);
    })

    test('Verify user can add product to the shopping cart',async ()=>{
        //productpage = new ProductsPage(page);
        //await productpage.navigation();
        await productpage.addProductToMyCart('Sauce Labs Fleece Jacket');
        await expect(productpage.productRemoveButton).toBeVisible();
        await productpage.addProductToMyCartFromProductDetailsPage('Test.allTheThings() T-Shirt (Red)');
        await expect(productpage.productRemoveButton).toBeVisible();
        await expect(productpage.shoppingCartBadge).toHaveText('2');
    })

    test('Navigate to shopping cart detsils page and assert my product',async ()=>{
        //productpage = new ProductsPage(page);
        //await productpage.navigation();
        await productpage.shoppingCartDetailsPgae.click();
        await page.pause();
    })


})

