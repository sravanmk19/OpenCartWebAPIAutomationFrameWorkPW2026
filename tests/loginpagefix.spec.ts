import {test,expect} from '../src/pages/fixtures/pageFixtures';

test.beforeEach('Navigate to login page test',async ({loginPage})=>
{
    await loginPage.gotoLoginPage();
})

test('login page title test', async({loginPage})=>
{
    let loginTitle=await loginPage.getLoginPageTitle();
    console.log('Login page title is: ',loginTitle);
    expect(  loginTitle).toBe('Account Login')
});

test('forgot pwd link exist',async({loginPage})=>
{
     expect( await loginPage.isForgottenPwdLinkExist()).toBeTruthy(); //must display   
})

test('user is able to login app',async({loginPage,homePage})=>
{
    await loginPage.doLogin(process.env.APP_USERNAME,process.env.APP_PASSWORD)
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    expect.soft( await homePage.isLogoutLinkExist()).toBeTruthy();

});

test.skip('should display an error message when invalid credentials',async({loginPage,page})=>
{
    await loginPage.doLogin('ssasas','assa');
    await loginPage.isInvalidLoginErrorDisplay();
    expect( await loginPage.isInvalidLoginErrorDisplay()).toBeTruthy();
    //await page.pause();

});

test('should display the expected headers on the login page', async({loginPage})=>
{
    expect.soft(await loginPage.isNewCustomerTitleDisplay()).toBeTruthy();
    expect(await loginPage.isReturningCustomerTitleDisplayed()).toBeTruthy();
})
