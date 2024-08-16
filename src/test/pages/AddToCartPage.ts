import { Page } from "playwright/test";
import * as add2cartloc from "../locators/Add2CartLoc.json"
import { BasePage } from "./BasePage";

export class AddToCartPage extends BasePage{
    constructor(page:Page)
    {
       super(page);
    }

   
    async SearchItem(str:any)
    {
        console.log("search Item ");
        await this.page.waitForTimeout(5000);
        await this.fill(add2cartloc.searchItemtextbar,str);
        await this.page.locator(add2cartloc.searchItemtextbar.locator).press('Enter');
        await this.page.waitForTimeout(5000);
        console.log("click on Item ");
        await this.page.getByRole('link', { name: 'Apple iPhone 13 (128GB) - Blue' }).nth(1).click();
     
    }
}