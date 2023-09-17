import {test as base} from "@playwright/test"
import { LoginPage } from "../pages/login.page"
import { ProductsPage } from "../pages/product.page"
import { CheckoutPage } from "../pages/checkout.page"
import { ShoppingCartDetailsPage } from "../pages/shoppingCartDetails.page"
import {CheckOutOverviewPage} from "../pages/checkoutOverview.page"
import { MyAccountPage } from "../pages/myAccount.page"

type pageObjectClass = {
    loginPage:LoginPage,
    productPage: ProductsPage,
    checkoutPage: CheckoutPage,
    shoppingCartDetails: ShoppingCartDetailsPage,
    checkoutOverview: CheckOutOverviewPage
    myaccountPage: MyAccountPage;
}

export const test = base.extend<pageObjectClass>({
    loginPage: async ({page},use)=>{
        await use(new LoginPage(page))
    },
    productPage: async ({page},use)=>{
        await use(new ProductsPage(page))
    },
    checkoutPage:async ({page}, use) => {
        await use(new CheckoutPage(page))
    },
    shoppingCartDetails: async ({page}, use)=>{
        await use(new ShoppingCartDetailsPage(page))
    },
    checkoutOverview: async({page}, use)=>{
        await use(new CheckOutOverviewPage(page))
    },
    myaccountPage: async ({page}, use)=>{
        await use(new MyAccountPage(page))
    }

})