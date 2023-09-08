import { Page, Locator } from "@playwright/test"
class ProductsPage {
    page: Page;
    productPageTitle: Locator;
    addToCartButton: Locator;
    productRemoveButton: Locator;
    productSortDropDown: Locator;
    products: Locator;
    productValue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productPageTitle = page.locator('.product_label');
        this.products = page.locator('.inventory_item_name');
        this.addToCartButton = page.getByRole('button', { name: 'ADD TO CART' });
        this.productRemoveButton = page.getByRole('button', { name: 'REMOVE' });
        this.productSortDropDown = page.locator('.product_sort_container');
        this.productValue = page.locator('.inventory_item_price');

    }

    async navigation() {
        await this.page.goto('https://www.saucedemo.com/v1/inventory.html');
    }

    async sortProductWithValue(sortingOption:string) {
        await this.productSortDropDown.selectOption(sortingOption);
        const productPriceWith = await this.productValue.allTextContents();
        const productPrice = productPriceWith.map(item => item.split('$')[1]);
        console.log(productPrice);
      
        function isSorted(productPrice: string | any[]) {
          for (let i = 0; i < productPrice.length - 1; i++) {
            if (parseFloat(productPrice[i]) > parseFloat(productPrice[i + 1])) {
              return true;
            }
          }
          return false;
        }
        return isSorted(productPrice);
      }
      
}
export default ProductsPage