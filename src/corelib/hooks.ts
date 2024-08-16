import {Before,After, setDefaultTimeout, BeforeAll, AfterStep, BeforeStep, Status, AfterAll} from "@cucumber/cucumber";
import { Browser,BrowserContext,Page,chromium } from "playwright/test";
import * as prop from "../config/properties";

setDefaultTimeout(1000*60*2);

let browser:Browser;
let bCtx:BrowserContext;
let page:Page;

BeforeAll(async function() {

    let browserType=prop.browserType;
    switch(browserType)
    {
        case 'chrome':
        browser = await chromium.launch({ headless: false, channel:"chrome",args: ["--start-maximized"]});
        break;

        default:
            throw new Error (`invalid browser type ${browserType}`);
    }
    
})

Before(async function(scenario){
    scenario.result
    bCtx=await browser.newContext({viewport:null,javaScriptEnabled:true})
    page = await bCtx.newPage();
    await page.goto(prop.appUrl);
    this.attach(`---------${scenario.pickle.name} is started--------------`)

})
BeforeStep(async function(scenario){

    this.attach(`---------${scenario.pickleStep.text} is started--------------`)

})

AfterStep(async function(scenario){

    if(scenario.result?.status==Status.PASSED)
        {
            let img=await page.screenshot({
                path:`./reports/${scenario.pickle.name}.png`
            });
            this.attach(img,'image/png');
        }
    this.attach(`---------${scenario.pickleStep.text} is ended--------------`)

})
After(async function(scenario){

   
     this.attach(`---------${scenario.pickle.name} is ended--------------`)
     this.attach(`>>>>>>>>>>${scenario.result?.status} >>>>>>>>>>>>>`)
     if(scenario.result?.status==Status.FAILED)
        {
            let img=await page.screenshot({
                path:`./reports/${scenario.pickle.name}.png`
            });
            this.attach(img,'image/png');
        }
        await page.waitForTimeout(5000);
        await page.close();
        await bCtx.close();
})

AfterAll(async function(){

       await browser.close(); 
})

export{page};