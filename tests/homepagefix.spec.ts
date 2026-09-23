
import {expect, test} from '../src/pages/fixtures/pageFixtures';


test.beforeEach('login to NaveenLabs app', async({loginPage,page})=>
{
    await loginPage.gotoLoginPage();
    //await page.waitForTimeout(3000);
    await loginPage.doLogin(process.env.APP_USERNAME,process.env.APP_PASSWORD);
})

test('homepage title test', async({homePage})=>{
   let homepageTitle= await homePage.getHomePageTitle();
   console.log('Home page title is : ',homepageTitle);
   expect( homepageTitle).toBe('My Account');
})

test('logout link exit test', async({homePage})=>
{
    console.log('In HomePage logout link is displayed: ', await homePage.isLogoutLinkExist());
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('headers are exist in Homepage ',async({homePage})=>
{
    let allHeader=await homePage.getHomePageHeader();
    console.log('homepage Header Names: ',allHeader);
    expect.soft( allHeader).toHaveLength(4);
    expect.soft( allHeader).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
});

test('get all subMen in homepage test', async({homePage})=>
{
    let allSubMenu=await homePage.getAllSubMenu();
    //console.log('All Sub Menu links are: ',allSubMenu);
    expect.soft(await allSubMenu).toHaveLength(13);
    expect.soft ( await allSubMenu).toEqual([
        'My Account',
        'Edit Account',
        'Password',
        'Address Book',
        'Wish List',
        'Order History',
        'Downloads',
        'Recurring payments',
        'Reward Points',
        'Returns',
        'Transactions',
        'Newsletter',
        'Logout'
        ])

})