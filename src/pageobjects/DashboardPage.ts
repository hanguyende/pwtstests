import {Page, Locator} from '@playwright/test';
export class DashboardPage
{
	public page: Page;
	public products: Locator;
	public productsText: Locator;
	public cart: Locator;
	public orders: Locator;

constructor(page: Page)
{
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");

}

async searchProductAddCart(productName: string)
{
   
    const titles= await this.productsText.allTextContents();
    console.log("all titles " + titles);
    console.log("this we wanna add " + productName);
    const count = await this.products.count();
    for(let i =0; i < count; ++i)
    {
        if(await this.products.nth(i).locator("b").textContent() === productName)
        {
            //add to cart
            await this.products.nth(i).locator("text= Add To Cart").click();
            break
        }
    }
}

async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart()
{
    await this.cart.click();
}
}