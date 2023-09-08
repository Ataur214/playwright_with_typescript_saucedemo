import { Page, Locator } from "@playwright/test";

class LoginPage{

    page: Page;
    userNameInputField: Locator;
    passInputField: Locator;
    loginButton: Locator;
    productPageTitle:Locator;
    errorMessage: Locator;

    constructor(page:Page){
        this.page = page;
        this.userNameInputField = page.locator('#user-name');
        this.passInputField = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.productPageTitle = page.locator('.product_label');
        this.errorMessage = page.locator('h3[data-test=error]');
    }

    async navigation(){
        await this.page.goto('https://www.saucedemo.com/v1/');
    }

    async inputUserCred(userName:string, userPass:string){
        await this.userNameInputField.type(userName);
        await this.passInputField.type(userPass);
        await this.loginButton.click();
    }

    async invalidLoginErrorMessage(){
        return this.errorMessage.textContent();
    }

}
export default LoginPage;