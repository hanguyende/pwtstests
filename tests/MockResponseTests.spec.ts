import {test, request, APIRequestContext, APIResponse} from '@playwright/test';
import {ApiUtils} from '../src/Utils/ApiUtils';

const loginPayLoad = {userEmail:"anshika@gmail.com", userPassword:"Iamking@000"};
const orderPayLoad = {orders:[{country:"India", productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};
const fakePayload = {data:[], message:"No Orders"};
let token: string;

test.beforeAll( async () =>
{
    const apiContext: APIRequestContext = await request.newContext();
    const apiUtils: ApiUtils = new ApiUtils(apiContext, loginPayLoad);
    token = await apiUtils.getToken();    
});
/*
test('Check empty Order list', async ({page})=>
{
    page.addInitScript(value => 
        {
            window.localStorage.setItem('token',value);
        }, token
    );
    console.log(fakePayload);
    await page.goto('https://rahulshettyacademy.com/client/');
   
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/**', async route =>
    {
      const response: APIResponse =  await route.fetch();
      console.log(response.json);
      const body = fakePayload;
       route.fulfill(
          { 
            response,
            body: JSON.stringify(body),
          });
    });
    await page.pause();
    await page.locator("button[routerlink*='myorders']").click();
    console.log(await page.locator(".mt-4").textContent());    

});
*/