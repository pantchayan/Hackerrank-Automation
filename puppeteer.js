let puppeteer = require("puppeteer");

let browserPromise = puppeteer.launch({headless:false});

browserPromise
.then((browser)=>{
    let newTabPromise = browser.newPage();
    return newTabPromise
}).then((newTab)=>{
    let goToGooglePromise = newTab.goto("https://www.google.com");

    return goToGooglePromise;
})