import { Page } from "@playwright/test";

export class BasePage {
    protected page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async click(object: any) {
        await this.page.locator(object["locator"]).click(); 
    }

    async fill(object: any,data:string) {
        await this.page.locator(object["locator"]).fill(data); 
        console.log(`Fill value ${data} on ${object["description"]}`)

    }

    
}
