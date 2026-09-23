import {test as baseTest, expect} from '@playwright/test';
import {BasePage} from '../BasePage';
import { LoginPage } from '../LoginPage';
import { HomePage } from '../HomePage';
import { SearchResultPage } from '../SearchResultPage';
import { ProductInfoPage } from '../ProductInfoPage';


type pageFeatures={
    basePage:BasePage,
    loginPage:LoginPage,
    homePage:HomePage
    searchResultPage:SearchResultPage,
    productInfoPage:ProductInfoPage
};

//extend the playwright test: using baseTest.extend: Inhertiance
export let test=baseTest.extend<pageFeatures>({
    
    basePage:async ({page},use)=>
        {
            let basePage=new BasePage(page);
            use(basePage);
        },

    loginPage:async ({page},use)=>
        {
            let loginPage=new LoginPage(page);
            use(loginPage);
        },
    
    homePage:async ({page},use)=>
        {
            let homePage=new HomePage(page);
            use(homePage);
        },    

    searchResultPage:async ({page},use)=>
        {
            let searchResultPage=new SearchResultPage(page);
            use(searchResultPage);
        },

    productInfoPage:async ({page},use)=>
        {
            let productInfoPage=new ProductInfoPage(page);
            use(productInfoPage);
        },

})

export {expect} from '@playwright/test';