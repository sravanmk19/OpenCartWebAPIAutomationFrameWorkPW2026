import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


 export class LoginPage extends BasePage 
    {

        //1. private Locators:
         private readonly emaiId:Locator;
         private readonly password:Locator;
         private readonly lgnBtn:Locator;
         private readonly forgottenLink:Locator;
         private readonly loginErrorMesg:Locator;
         private readonly newCustomerHeader:Locator;
         private readonly RetrnCustomerHeader:Locator;  
         

         //2. constructor of the page class: initalize the locator
         constructor(page:Page)
         {
             super(page);
             // this.global=local
             this.emaiId=page.getByRole('textbox', { name: 'E-Mail Address' });
             this.password=page.getByLabel('Password');
             this.lgnBtn=page.getByRole('button', { name: 'Login' });
             this.forgottenLink=page.getByRole('link', {name: 'Forgotten Password' }).first();
             this.loginErrorMesg=page.locator('.alert-danger');
             this.newCustomerHeader=page.getByRole('heading',{name:'New Customer', level:2});
             this.RetrnCustomerHeader=page.getByRole('heading',{name:'Returning Customer',level:2});
         }

         //3. public page action(methods) / behaviour Encapsulation
         async gotoLoginPage(): Promise<void>
         {
            await this.page.goto('/opencart/index.php?route=account/login');
         }

         async getLoginPageTitle(): Promise<string>
         {
            return await this.page.title();
         }

         async isForgottenPwdLinkExist(): Promise<boolean>
         {
            return await this.forgottenLink.isVisible();
         }

         async doLogin(username:string, password:string): Promise<void>
         {
            console.log(`App User creds: ${username} and ${password}`);
            await this.emaiId.fill(username);
            await this.password.fill(password);
            // await this.page.waitForTimeout(5000);
            // console.log('Login enabled:', await this.lgnBtn.isVisible());
            // console.log('Login enabled:', await this.lgnBtn.isEnabled());
            await this.lgnBtn.click();
         }

         async isInvalidLoginErrorDisplay(): Promise<boolean>
         {
            return await this.loginErrorMesg.isVisible();

         } 
         
         async isNewCustomerTitleDisplay():Promise<boolean>
         {
            return await this.newCustomerHeader.isVisible();
         }

         async isReturningCustomerTitleDisplayed():Promise<boolean>
         {
            return await this.RetrnCustomerHeader.isVisible();
         }

    }