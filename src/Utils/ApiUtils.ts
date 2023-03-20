import {APIRequestContext, expect} from '@playwright/test';

export class ApiUtils
{
	public apiContext: APIRequestContext;
	public loginPayLoad: any;

    constructor(apiContext: APIRequestContext, loginPayLoad: any)
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
        })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;

    }

    async createOrder(orderPayLoad: any)
    {
        const token = await this.getToken();
        const orderRespone = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayLoad,
            headers:
            {
                'Authorization' : token,
                'Content-Type' :'application/json'
            },
        })
        const orderJsonResponse = await orderRespone.json();
        console.log(orderJsonResponse);
        const orderId = orderJsonResponse.orders[0];
        
        return orderId;
    }

    async getOrderResponse(orderPayLoad: any)
    {
        const token = await this.getToken();
        const orderRespone = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayLoad,
            headers:
            {
                'Authorization' : token,
                'Content-Type' :'application/json'
            },
        })
        const orderJsonResponse = await orderRespone.json();
        console.log(orderJsonResponse);
        return orderJsonResponse;
    }
}