import { Locator, Page } from '@playwright/test';

export class OrdersHistoryPage
{
	public page: Page;
	public ordersTable: Locator;
	public rows: Locator;
	public orderdIdDetails: Locator;

constructor(page: Page)
{
    this.page = page;
    this.ordersTable = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.orderdIdDetails = page.locator(".col-text");
}
async searchOrderAndSelect(orderId: string)
{

    await this.ordersTable.waitFor();
for(let i =0; i<await this.rows.count(); ++i)
 {
    const rowOrderId =await this.rows.nth(i).locator("th").textContent();
    if ((rowOrderId !=null) && orderId.includes(rowOrderId))
    {
        await this.rows.nth(i).locator("button").first().click();
        break;
    }
 }

}

async getOrderId()
{
    return await this.orderdIdDetails.textContent();
}

}
