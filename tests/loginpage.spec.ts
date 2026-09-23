import {test,expect} from '@playwright/test';
import {LoginPage} from '../src/pages/LoginPage';
import {HomePage} from '../src/pages/HomePage';

let loginPage:LoginPage;
let homepage:HomePage;

test.beforeEach('Go to login page',async({page})=>
{
    loginPage=new LoginPage(page);
    await loginPage.gotoLoginPage();

    homepage=new HomePage(page);
})

test.skip('login page title test', async()=>
{
    // loginPage = new LoginPage(page);
    // await loginPage.gotoLoginPage();
    
    let pageTitle=await loginPage.getLoginPageTitle();
    console.log( 'Login page Title is: ',pageTitle);
     expect(pageTitle).toBe('Account Login');        
});

test.skip('forgot pwd link exist test', async()=>
{
    // loginPage = new LoginPage(page)
    //isForgottenPwdLinkExist
    let linkExist=await loginPage.isForgottenPwdLinkExist();
     expect(linkExist).toBeTruthy();   
});

test.skip('user is able to login test',async()=>
{
    // loginPage=new LoginPage(page);
    // await loginPage.gotoLoginPage();
    await loginPage.doLogin('pettermon456@gmail.com','pw1234');
    expect.soft(await homepage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homepage.getHomePageTitle()).toBe('My Account')
});

test.skip('New Customer Title Header test', async()=>
{
   let custmrTitle= await loginPage.isNewCustomerTitleDisplay();
   expect(custmrTitle).toBeTruthy();
});