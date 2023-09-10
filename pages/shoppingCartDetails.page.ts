import { Page, Locator } from "@playwright/test"

class ShoppingCartDetailsPage {
    page: Page;
    products: Locator;
    checkOutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator('.inventory_item_name');
        this.checkOutButton = page.locator('.checkout_button');

    }
}
export default ShoppingCartDetailsPage