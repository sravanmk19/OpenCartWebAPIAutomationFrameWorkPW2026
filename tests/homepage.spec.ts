import {test,expect} from '@playwright/test';
import {LoginPage} from '../src/pages/LoginPage';
import {HomePage} from '../src/pages/HomePage';


let homepage:HomePage;
let loginpage:LoginPage;

test.beforeEach(async({page})=>
{
     loginpage=new LoginPage(page);
    await loginpage.gotoLoginPage();
    await loginpage.getLoginPageTitle();
    await loginpage.isForgottenPwdLinkExist();
    await loginpage.doLogin('pettermon456@gmail.com','pw1234');
    homepage=new HomePage(page);
});

test.skip('my homepage title test',async()=>
{
   let homepageTitle= await loginpage.getLoginPageTitle();
   console.log('After user login page title: ',homepageTitle);
   expect(homepageTitle).toBe('My Account');
})

test.skip('logout link exit test', async()=>
{
    console.log('In HomePage logout link is displayed: ', await homepage.isLogoutLinkExist());
    expect(await homepage.isLogoutLinkExist()).toBeTruthy();
});

test.skip('headers are exist in Homepage ',async()=>
{
    let allHeader=await homepage.getHomePageHeader();
    console.log('homepage Header Names: ',allHeader);
    expect.soft(allHeader).toHaveLength(4);
    expect.soft(allHeader).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
});