import { Page, Locator } from "@playwright/test"

class CheckOutOverviewPage {
    page: Page;
    checkoutPageTitle: Locator;
    products: Locator;
    finishButton: Locator;
    oderSuccessMessage: Locator;
    productPrice: Locator;
    summarySubtotal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutPageTitle = page.locator('.subheader');
        this.products = page.locator('.inventory_item_name');
        this.finishButton = page.locator('a[href*="checkout-complete.html"]');
        this.oderSuccessMessage = page.locator('.checkout_complete_container h2');
        this.productPrice = page.locator('.inventory_item_price');
        this.summarySubtotal = page.locator('.summary_subtotal_label');
    }

    async orderSummeryCalculation() {
        const productPricewithText = await this.productPrice.allTextContents();
        const itemPrice = productPricewithText.map(item => item.split('$')[1]);
        let result = 0;
        for (let i = 0; i < itemPrice.length; i++) {
            result = result + parseFloat(itemPrice[i]);
        }
        return result;
    }

    async expectedSubTotal() {
        const actualSubtotalWithText = await this.summarySubtotal.textContent();

        if (actualSubtotalWithText === null || actualSubtotalWithText === undefined) {
            throw new Error("The 'actualSubtotalWithText' is null or undefined.");
        }
        const expectedSubTotal = actualSubtotalWithText.split('$')[1];
        return parseFloat(expectedSubTotal);
    }

}
export default CheckOutOverviewPage