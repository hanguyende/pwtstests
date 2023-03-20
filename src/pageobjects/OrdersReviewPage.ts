import { expect, Page, Locator } from "@playwright/test";

export class OrdersReviewPage
{
	public page: Page;
	public country: Locator;
	public dropdown: Locator;
	public emailId: Locator;
	public submit: Locator;
	public orderConfirmationText: Locator;
	public orderId: Locator;

constructor(page: Page)
{
    this.page = page;
this.country = page.locator("[placeholder*='Country']");
this.dropdown = page.locator(".ta-results");
this.emailId = page.locator(".user__name [type='text']").first();
this.submit =  page.locator(".action__submit");
this.orderConfirmationText = page.locator(".hero-primary");
this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

}
async searchCountryAndSelect(countryCode: string, countryName: string)
{

    await this.country.type(countryCode,{delay:100});
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();
    for(let i =0;i< optionsCount; ++i)
    {
      const  text =  await this.dropdown.locator("button").nth(i).textContent();
        if((text != null) && text.trim() === countryName)
        {
           await this.dropdown.locator("button").nth(i).click();
           break;
        }
    }

}

async VerifyEmailId(username: string)
{
    await expect(this.emailId).toHaveText(username);
}

async SubmitAndGetOrderId()
{
 await this.submit.click();
 await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
 return await this.orderId.textContent();
}
}
   