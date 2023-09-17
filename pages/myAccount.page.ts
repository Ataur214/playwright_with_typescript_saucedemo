import { Page } from "@playwright/test";

export class MyAccountPage{
    page:Page;
    constructor(page:Page){
        this.page = page;
    }

    async visit():Promise<void>{
        this.page.goto("http://localhost:2221/login?redirect=/my-account");
    }

}