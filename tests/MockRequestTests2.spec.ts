import {test, expect, page} from '@playwright/test';

//Intercept Request
test('Not authorize access', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client/');
    const userName = page.locator('#userEmail');
    const userEmail = "rahulshetty@gmail.com";
    const pwd = page.locator('#userPassword'); 
    await userName.type(userEmail)
    await pwd.type("Iamking@00");
    const loginBtn = page.locator('#login');
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.pause();
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route=> 
        route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6262e95ae26b7e1a10e89bf0'})
        )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p[class='blink_me']")).toBeVisible();

});
