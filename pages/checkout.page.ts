import { Page, Locator } from "@playwright/test"
class CheckoutPage {
    page: Page;
    pageTitle: Locator;
    checkOutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.subheader');

    }
}
export default CheckoutPage