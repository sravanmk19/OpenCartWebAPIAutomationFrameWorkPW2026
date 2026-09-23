import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends(BasePage)
{
            //1. private Locators:
    protected readonly headers:Locator;
    protected readonly logoutlink:Locator;
    protected readonly submenu:Locator;
    protected readonly searchBox:Locator;
    protected readonly searchIcon:Locator;

             //2. constructor of the page class: initalize the locator
    constructor(page:Page)
    {
        super(page);
        // this.global=local
        this.headers=page.getByRole('heading',{level:2});
        this.logoutlink=page.getByRole('link',{name:'Logout'}).last();
        this.submenu=page.locator('.list-group a');
        this.searchBox=page.getByRole('textbox', { name: 'Search' });
        this.searchIcon=page.locator('#search button');
    }

             //3. public page action(methods) / behaviour Encapsulation
    async getHomePageTitle():Promise<string>
    {
        return await this.page.title();
    }

    async isLogoutLinkExist():Promise<boolean>
    {
        return await this.logoutlink.isVisible();
    }

    async getHomePageHeader():Promise<string[]>
    {
        return await this.headers.allInnerTexts();
    }

    async getAllSubMenu():Promise<string[]>
    {
        return await this.submenu.allInnerTexts();
    }

    async doSearch(searchkey:string)
    {
        console.log('Search key value is: ', searchkey);
        await this.searchBox.fill(searchkey);
        await this.searchIcon.click();
    }
}