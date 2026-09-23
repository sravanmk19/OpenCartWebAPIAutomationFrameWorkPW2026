
import {expect, test} from '../src/pages/fixtures/pageFixtures';


test.beforeEach('login to NaveenLabs app', async({loginPage})=>
{
    await loginPage.gotoLoginPage();
    //await page.waitForTimeout(3000);
    await loginPage.doLogin(process.env.APP_USERNAME,process.env.APP_PASSWORD);
});

test('Verify search ', async ({homePage,searchResultPage,page})=>
{
    await homePage.doSearch('macbook');
    //await page.pause();
    let resultCount=await searchResultPage.getProductSearchResultsCount();
    console.log('Search results count is: ', resultCount);
    expect (resultCount).toBe(3);    
});

test('Verify user is able to land on product page', async({homePage,searchResultPage,page})=>
{
        await homePage.doSearch('macbook');
        await searchResultPage.selectProduct('MacBook Pro');
        expect( await page.title()).toBe('MacBook Pro');
        await page.pause();

})