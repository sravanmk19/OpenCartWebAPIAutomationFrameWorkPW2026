import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class CartPage extends(BasePage){

        //   private Locators:
        protected readonly searchResults:Locator;

                         //2. constructor of the page class: initalize the locator
            constructor(page:Page)
            {
                 super(page);
                    // this.global=local
                this.searchResults=page.locator('div.product-layout');
            }

        // actions
            async getProductSearchResultsCount():Promise<number>
         {
            return await this.searchResults.count();
         }

}