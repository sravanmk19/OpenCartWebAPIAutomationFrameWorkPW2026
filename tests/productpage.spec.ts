import {expect, test} from '../src/pages/fixtures/pageFixtures';


test.beforeEach('login to NaveenLabs app', async({loginPage})=>
{
    await loginPage.gotoLoginPage();
    //await page.waitForTimeout(3000);
    await loginPage.doLogin(process.env.APP_USERNAME,process.env.APP_PASSWORD);
});

test('Verify product header', async({homePage,searchResultPage,productInfoPage,page})=>
{
        await homePage.doSearch('macbook');
        await searchResultPage.selectProduct('MacBook Pro');
        expect( await productInfoPage.getProductHeader()).toBe('MacBook Pro');

});

test('verify product image count', async ({homePage,searchResultPage,productInfoPage,page})=>
{
        await homePage.doSearch('macbook');
        await searchResultPage.selectProduct('MacBook Pro');
        expect(await productInfoPage.getImageCount()).toBe(4);

})

test('verify Samsung product image count', async ({homePage,searchResultPage,productInfoPage,page})=>
{
        await homePage.doSearch('samsung');
        await searchResultPage.selectProduct('Samsung Galaxy Tab 10.1');
        expect(await productInfoPage.getImageCount()).toBe(7);
        let actualProductInfoMap=await productInfoPage.getProductInfo();
        console.log('Actual Product Details is: ',actualProductInfoMap);

})

test('verify product information/data', async ({homePage,searchResultPage,productInfoPage,page})=>
{
        await homePage.doSearch('macbook');
        await searchResultPage.selectProduct('MacBook Pro');
        let actualProductInfoMap=await productInfoPage.getProductInfo();
        console.log('Actual Product Details is: ',actualProductInfoMap);

        expect(actualProductInfoMap.get('productheader')).toBe('MacBook Pro');
        expect(actualProductInfoMap.get('productImagecount')).toBe(4);
        expect(actualProductInfoMap.get('Brand')).toBe('Apple');        
        expect(actualProductInfoMap.get('Product Code')).toBe('Product 18');    
        expect(actualProductInfoMap.get('Reward Points')).toBe('800');    
        expect(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');       
        
        expect(actualProductInfoMap.get('productprice')).toBe('$2,000.00');   
        expect(actualProductInfoMap.get('extraprice')).toBe('$2,000.00'); 

        //await page.pause();
})