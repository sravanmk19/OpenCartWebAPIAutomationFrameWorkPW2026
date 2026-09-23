import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { promises } from "node:dns";

export class ProductInfoPage extends(BasePage)
{
    //            //1. private Locators:
    protected readonly header:Locator;
    protected readonly productImages:Locator;
    protected readonly productMetaData:Locator;
    protected readonly productPricing:Locator;
     productInfoMap:Map<string,string|number>;

                 //2. constructor of the page class: initalize the locator
    constructor(page:Page)
    {
        super(page);
        this.header=page.getByRole('heading', {  level: 1 });
        this.productImages=page.locator('div#content li img');
        this.productMetaData=page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing=page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.productInfoMap=new Map<string,string|number>;

    }

            //3. public page action(methods) / behaviour Encapsulation
    async getProductHeader():Promise<string>
        {
            return await this.header.innerText();
        }
        
     async getImageCount():Promise<number>
    {
        await this.productImages.first().waitFor({state:'visible'})
        return await this.productImages.count();
    }


    /*
    Brand: Apple
    Product Code: Product 18
    Reward Points: 800
    Availability: Out Of Stock
    */
   async getProductMetaData():Promise<void>
   {
    let metaData=await this.productMetaData.allInnerTexts();
   for  (let data of metaData)
    {
       let meta= data.split(':');
       let metaKey=meta[0].trim();
       let metaValue=meta[1].trim();
       this.productInfoMap.set(metaKey,metaValue);
    }
   };

   async getProductPriceData():Promise<void>
   {
    let priceData=await this.productPricing.allInnerTexts();
    let productPrice=priceData[0].trim();
    let exTaxPrice=priceData[1].split(':')[1].trim();
    this.productInfoMap.set('productprice',productPrice);
    this.productInfoMap.set('extraprice',exTaxPrice);  
   };

        async getProductInfo(): Promise<Map<string, string|number>>
    {
        this.productInfoMap.set('productheader',await this.getProductHeader());
        this.productInfoMap.set('productImagecount',await this.getImageCount());
        await this.getProductMetaData();
        await this.getProductPriceData();
        return this.productInfoMap;
    }
    
}