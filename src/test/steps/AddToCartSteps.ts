
import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext, expect } from "@playwright/test";
import{page} from "../../corelib/hooks";
import{AddToCartPage} from "../pages/AddToCartPage"
import * as add2cartloc from "../locators/Add2CartLoc.json"
import * as prop from "../../config/properties";



let page1: Page;
let pagePromise: any;
let add2Cart:AddToCartPage;

Given('Load application url', { timeout: 60 * 1000 }, async function () {
   this.parameters.a=10;
   console.log("page titile=" + await page.title());
   await page.waitForLoadState();
   console.log("load application Url");

   console.log(`in load application step - ${this.parameters.a}`)
});


When('Search {string} product on application', { timeout: 60 * 1000 }, async function (string:any) {
    console.log("search "+string+" product ");
    add2Cart=new AddToCartPage(page);
    await add2Cart.SearchItem(string);
    console.log("New tab is opened");

   // Start waiting for new TAB after clicking. 
   pagePromise = page.waitForEvent('popup');
   page1 = await pagePromise;
   await page1.waitForLoadState();
   console.log("new tab title:="+await page1.title());
   console.log(`in load application step value of a- ${this.parameters.a}`);



});


When('Select Midnight color', { timeout: 60 * 1000 }, async function () {
   //page.locator(".a-size-base inline-twister-dim-title-value-truncate swatch-title-text a-text-bold").click();

   //await page1.waitForLoadState();


});


When('Add Item to cart', { timeout: 60 * 1000 }, async function () {

   await page1.waitForLoadState();
   console.log("Click on Add to cart button");
   await page1.locator('#desktop_qualifiedBuyBox').getByLabel('Add to Cart').click();
   await page1.waitForLoadState();
  
});


Then('verify item in cart', { timeout: 60 * 1000 }, async function () {
   console.log("verify Item in cart");

   await page1.locator(add2cartloc.CartBtn.locator).click();
   await page1.waitForTimeout(5000);

   await page1.waitForLoadState();

   let cartValue=await page1.locator(add2cartloc.CartValue.locator).innerText();
   expect(cartValue).toContain("1");

   console.log("cart has "+cartValue +" item");

   //await expect(await page1.locator("div[id='sc-active-a29645f6-86db-4366-b378-6435e7bef62e'] span[class='a-truncate-cut']")
   //.innerText()).toEqual("Apple iPhone 13 (128GB) - Blue");
  
});


Then('Procced to CheckOut', { timeout: 60 * 1000 }, async function () {
console.log("proceed to checkout");
await page1.locator(add2cartloc.ProccedToCheckOut.locator).click();
await page1.waitForTimeout(5000);

console.log("close new tab");

await page1.close();

});



Then('Submit the payment', { timeout: 60 * 1000 }, async function () {
   console.log("Submit the payment");

});





