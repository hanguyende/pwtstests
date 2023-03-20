import {test, expect} from '@playwright/test';
import { customtest } from '../src/Utils/test-base';

import { POManager } from '../src/pageobjects/POManager';
//Json->string->js object
import dataset from '../src/Utils/placeorderTestData.json';
for(const data of dataset)
{
test(`@Web Client App login for ${data.productName}`, async ({page})=>
{
    const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(data.productName);
   await cartPage.Checkout();

   const ordersReviewPage = poManager.getOrdersReviewPage();
   await ordersReviewPage.searchCountryAndSelect("ind","India");
   const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
 
});
}

customtest(`Client App login`, async ({page,testDataForOrder})=>
{
  const poManager = new POManager(page);
   //js file- Login js, DashboardPage
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    const searchAndAdd = await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    console.log("Search and add " + searchAndAdd);
    await dashboardPage.navigateToCart();
    
   const cartPage = poManager.getCartPage();
   
   await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
   await cartPage.Checkout();
})






