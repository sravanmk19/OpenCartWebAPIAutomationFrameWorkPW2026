import { Page } from "@playwright/test";

export class BasePage{
    protected readonly page:Page; //"Create a protected variable called page that stores a Playwright Page object and should not be replaced later."

    constructor (page:Page)
    {
        this.page=page
    }

}