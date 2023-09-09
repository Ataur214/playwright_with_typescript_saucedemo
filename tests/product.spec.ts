import { test,expect } from "@playwright/test";
import ProductsPage from '../pages/product.page';

test.describe('Product Page', ()=>{
    let productpage: ProductsPage;
    test('Navigate to product page',async ({page})=>{
        productpage = new ProductsPage(page);
        await productpage.navigation();
        await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
        await expect(productpage.productPageTitle).toHaveText('Products');
        
    })

    test('Verify sorting is working fine with Price (high to low)',async ({page})=>{
        productpage = new ProductsPage(page);
        await productpage.navigation();
        const isSorted = await productpage.sortProductWithValue('Price (high to low)');
        expect(isSorted).toBe(true);
    })

    test('Verify sorting is working fine with Price (low to high)',async ({page})=>{
        productpage = new ProductsPage(page);
        await productpage.navigation();
        const isSorted = await productpage.sortProductWithValue('Price (low to high)');
        expect(isSorted).toBe(true);
    })

    test('Verify user can add product to the shopping cart',async ({page})=>{
        productpage = new ProductsPage(page);
        await productpage.navigation();
        await productpage.addProductToMyCart('Sauce Labs Fleece Jacket');
        await expect(productpage.productRemoveButton).toBeVisible();
        await productpage.addProductToMyCartFromProductDetailsPage('Test.allTheThings() T-Shirt (Red)');
        await expect(productpage.productRemoveButton).toBeVisible();
        await expect(productpage.shoppingCartBadge).toHaveText('2');
    })

    test('Navigate to shopping cart detsils page and assert my product',async ({page})=>{
        productpage = new ProductsPage(page);
        await productpage.navigation();
        await productpage.shoppingCartDetailsPgae.click();
        await page.pause();
    })


})

