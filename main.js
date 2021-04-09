let puppeteer = require("puppeteer");

// by default puppeteer has headless browser i.e., invisible.
// so has to set it to false
let browserPromise = puppeteer.launch({
  headless: false,
  // browser opens up maxsimized
  args: ["--start-maximized"],
  // aspect ratio is maintained as full
  defaultViewport: null
});

let tab;
let loginPath = "https://www.hackerrank.com/auth/login";
let username = "DemonSlayer123";
let password = "testing123";

browserPromise
  .then((browser) => {
      // browser.pages() returns all the tabs opened in array format.
      // alternative to this is browser.newPage() 
    let newTabArrPromise = browser.pages();
    return newTabArrPromise;
  })
  .then((newTabArr) => {
    tab = newTabArr[0];
    let loginPagePromise = tab.goto(loginPath);
    return loginPagePromise;
  })
  .then(() => {
    let usernameSelector = "input[aria-label='Your username or email']";

    // {delay : 100} signifies delay in between characters
    let usernamePromise = tab.type(usernameSelector, username, { delay: 100 });
    return usernamePromise;
  })
  .then(() => {
    let passwordSelector = "input[aria-label='Your password']";
    let passwordPromise = tab.type(passwordSelector, password, { delay: 100 });
    return passwordPromise;
  })
  .then(() => {
    let enterPromise = tab.keyboard.press("Enter");

    return enterPromise;
  })
  .then(() => {
    console.log("USER " + username + " HAS LOGGED IN SUCCESSFULLY!");

    // // Interview prep kit -->  .card-content h3[title="Interview Preparation Kit"]
    // let ipClickPromise = waitAndClick(".card-content h3[title='Interview Preparation Kit']");
    // return ipClickPromise;
    let ipPromise = tab.goto("https://www.hackerrank.com/interview/interview-preparation-kit");
    return ipPromise;
  })
  .then(()=>{
      // WarmUp exercises --> #base-card-6
      let warmupClickPromise = waitAndClick("a[data-attr1='warmup']");
      return warmupClickPromise;

  }).then(()=>{
      console.log("All good");
  }).catch((err) =>{ 
      console.log("ERROR  ",err);
  });


  
let waitAndClick = (selector) => {
  return new Promise((resolve, reject) => {
    let selectorWaitPromise = tab.waitForSelector(selector, { visible: true , timeout: 30000});

    selectorWaitPromise.then(()=>{
        let selectorClickPromise = tab.click(selector);
        return selectorClickPromise;
    })
    .then((selectorClickPromise)=>{
        console.log(selector, "Clicked", selectorClickPromise);
        resolve();
    })
    .catch((err)=>{
        console.log("error  ",err);
        reject("Error from wait and click.");
    })
  });
};
