import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { promises } from "node:dns";

export class SearchResultPage extends(BasePage)
{
    //            //1. private Locators:
    protected readonly searchResults:Locator;

                 //2. constructor of the page class: initalize the locator
    constructor(page:Page)
    {
         super(page);
            // this.global=local
        this.searchResults=page.locator('div.product-layout');
    }

         //3. public page action(methods) / behaviour Encapsulation
    
         async getProductSearchResultsCount():Promise<number>
         {
            return await this.searchResults.count();
         }

         async selectProduct(ProductName:string):Promise<void>
         {
            console.log('Product Name is: ',ProductName);
            await this.page.getByRole('link', { name: ProductName, exact:true }).first().click();
         }

}