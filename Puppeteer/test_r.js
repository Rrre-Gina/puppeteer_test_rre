const puppeteer = require('puppeteer');

async function main()
{
    const browser = await puppeteer.launch({
        headless: process.env.PUPPETEER_HEADLESS === 'FALSE',
        ignoreHTTPSErrors: true,
        defaultViewport: null,           
        args: [
            '--window-size=1366,768', 
            '--start-maximized'          
            ],
    });
    
    const page = await browser.newPage();
    page.on('console', (msg) => console.log('OI-OI, OSHIBOCHKA ', msg.text()));
    await page.setViewport({width: 1366, height: 768})
    
    await Authorization(page);
    await Product(page);
    await Shop(page);
    await Profile(page);
    await Orders(page);
    await browser.close();
}
main();

        async function Authorization(page) 
        {
            await page.goto('https://optica-qlt.netlify.app/login');
            await page.waitForSelector("#app")
            await page.type('input[id="login_email"]', 'dir@mail.ru');
            await page.type('input[id="login_password"]', '346488', { delay: 100 });
            await page.click('.ant-btn.ant-btn-primary.ant-btn-lg.ant-btn-block');
            await page.waitForTimeout(2000);
            await page.screenshot({path: 'imam.png'});
        }

        async function Product(page)
        {
            for (let i = 0; i < 3; i++) 
            {
            await page.hover('div > .ant-btn.ant-btn-primary.ant-btn-lg.ant-dropdown-trigger');
            await page.waitForTimeout(2000);
            await page.waitForSelector(".ant-dropdown-menu-item");
            await page.click('.ant-dropdown-menu-item')
            .then(() => { page.waitForSelector('._title')});
            await page.waitForSelector('.btn_green.ant-btn.ant-btn-lg');
            await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
            await page.waitForSelector('#user_name');

            await page.type('input#user_name',`Товар${Math.floor(Date.now() / 100)}`);
                
            await page.type('input#user_vendor_code',`${Math.floor(Date.now() / 100)}`);
                
            await page.click('#user_category_id');
            for (let i = 0; i < 5; i++) {
                await page.keyboard.press('ArrowDown');
            }
            await page.keyboard.press('Enter');
            await page.waitForTimeout(3000);
                
            await page.click('#user_manufacturer');
            for (let i = 0; i < 3; i++) {
                await page.keyboard.press('ArrowDown');
            }
            await page.keyboard.press('Enter');
                
            await page.click('#user_brand');
            for (let i = 0; i < 3; i++) {
                await page.keyboard.press('ArrowDown');
            }
            await page.keyboard.press('Enter');
                
            await page.click('#user_sale_price');
            await page.keyboard.type('1488');
            await page.keyboard.press('Tab');

            await page.type('textarea.ant-input','Описание товара');
            await page.keyboard.press('Tab');

            await page.keyboard.type('Комментарий к товару');
                
            await page.click('.btn_green.ant-btn.ant-btn-lg');
            await page.waitForSelector(".ant-table-row-cell-break-word");
            await page.screenshot({path: `product${Math.floor(Date.now() / 10)}.png`});

            await page.waitForSelector(".ant-dropdown-menu-item");
            }
        
            await page.waitForTimeout(3000);
        }

        async function Shop(page)
        {
            await page.click('.ant-menu > li:nth-child(6)')
          .then(() => page.waitForSelector('td > .ant-dropdown-trigger'));
            await page.click('.ant-btn.ant-btn-primary.ant-btn-lg');
            await page.waitForSelector('#shopsForm_name');

            await page.type('input#shopsForm_name', `Магазин-${Math.floor(Date.now() / 100)}`);
            await page.type('input#shopsForm_address', 'Кабанбай батыра 5/1');
            await page.type('input#shopsForm_phone', '+77007007070');
            await page.type('input#shopsForm_bin', `${Math.floor(Date.now() / 10)}`);
            await page.type('textarea#shopsForm_comment', 'Комментарий');
            await page.click('.btn_green.ant-btn.ant-btn-primary.ant-btn-lg');
            await page.waitForSelector(".ant-table-row-cell-break-word");
        }

        async function Profile(page)
        {
            await page.click('._user');
            await page.waitForSelector('.ant-btn.ant-btn-primary.ant-btn-lg');
            await page.click('.ant-btn.ant-btn-primary.ant-btn-lg');
            await page.waitForSelector('input#login_name');

            await page.click('input#login_name', {clickCount: 3});
            await page.type('input#login_name', `Директор-${Math.floor(Date.now() / 10)}`);
        }

        async function Orders(page)
        {
            await page.click('.ant-menu > li:nth-child(10)');
            await page.waitForSelector(".ant-table-row-cell-break-word");

            await page.click('.ant-select-selection.ant-select-selection--single');
            for (let i = 0; i < 6; i++) {
                await page.keyboard.press('Tab');
            }
            await page.waitForTimeout(2000);
            
            for (let i = 0; i < 2; i++) {
                await page.keyboard.press('ArrowDown');
            }
            await page.keyboard.press('Enter');
            await page.waitForSelector(".ant-table-row-cell-break-word");

            await page.hover('td > .ant-dropdown-trigger');
            await page.waitForTimeout(2000);
            await page.waitForSelector(".ant-dropdown-menu-item");
            await page.click('.ant-dropdown-menu-item')
            .then(() => {
                page.waitForSelector('._title')
            })
            await page.waitForSelector(".ant-btn-lg")

            await page.click('.btn_orange.ant-btn.ant-btn-primary.ant-btn-lg');
            await page.waitForTimeout(2000);
        }

        
