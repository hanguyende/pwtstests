import {test, expect, request, APIRequestContext} from "@playwright/test";
import {ApiUtils} from '../src/Utils/ApiUtils';
const loginPayLoad = {userEmail:"anshika@gmail.com", userPassword:"Iamking@000"};
const orderPayLoad = {orders:[{country:"India", productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};
let orderId: string;
let token: string;

test.beforeAll( async () =>
{
    const apiContext: APIRequestContext = await request.newContext();
    const apiUtils: ApiUtils = new ApiUtils(apiContext, loginPayLoad);
    orderId = await apiUtils.createOrder(orderPayLoad);  
    token = await apiUtils.getToken();  
});

test('CheckOrders', async ({page})=>
{
    page.addInitScript(value => 
        {
            window.localStorage.setItem('token',value);
        }, token
    );
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.pause();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const ordersItem = page.locator("tbody tr");
    console.log(ordersItem.count);
    const count = await ordersItem.count();
    for (let i=0; i<count; ++i)
    {
        const rowOrderId = await ordersItem.nth(i).locator("th").textContent();
        
        if(rowOrderId !=null && orderId.includes(rowOrderId))
        {
            await ordersItem.nth(i).locator("button").first().click();
            break;
        }
    } 
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();    
});