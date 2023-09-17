import { Page, Locator } from "@playwright/test"
export class CheckoutPage {
    page: Page;
    pageTitle: Locator;
    checkOutButton: Locator;
    firstName: Locator;
    lastName: Locator;
    zipCode: Locator;
    continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.subheader');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.zipCode = page.locator('#postal-code');
        this.continueButton = page.getByRole('button', {name:'CONTINUE'});
    }

    async fillUpChekOutForm(firstName: string, lastName:string, zipCode:string):Promise<void>{
        await this.firstName.type(firstName);
        await this.lastName.type(lastName);
        await this.zipCode.type(zipCode);
    }
}
//export default CheckoutPage
