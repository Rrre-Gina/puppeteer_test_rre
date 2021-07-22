const puppeteer = require('puppeteer');

module.exports = class BrowserLaunch{
    constructor(headless) {
        this.headlessVisible = headless;
        this.browser;
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: this.headlessVisible === 'TRUE',      // otobrajat deistvia v brauzere, esli hotim ubrat vosproizvedenie to stavim true
            ignoreHTTPSErrors: true,
            defaultViewport: null,           //otobrajenie kontenta, mojno zadat razmery kontenta. Esli hotim na ves' razmer brauzera to stavim "null"
            concurrency: false,
            maxConcurrency: 1,
            args: [
                '--no-sandbox',
                // '--window-size=1366,768', //mojno zadat razmer brauzera
                '--start-maximized'          //maksimalnyi razmer brauzera
                ],
            });
        return this.browser;
    }

    async close() {
        //close pages
        let pages = await this.browser.pages();
        await Promise.all(pages.map(page =>page.close()));
      
        //close browser
        await this.browser.close();
    }
}
