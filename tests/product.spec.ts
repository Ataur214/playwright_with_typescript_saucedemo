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
        await page.pause();
    })
})

