const puppeteer = require('puppeteer');
var faker = require('faker');

async function test() 
{
    const browser = await puppeteer.launch(
        {
            headless: false, 
            ignoreHTTPSErrors: true,
            defaultViewport: null,           
            args: ['--window-size=1366,768']
        });

    const page = await browser.newPage();
    await page.setViewport({width: 1366, height: 768});

    try 
    {
        await Authorization();
        await Product();
        await Shop();
        await Profile();
        await Orders();

        async function Authorization()
        {
            await page.goto('https://optica-qlt.netlify.app/login', {waitUntil: 'networkidle0'});
            await page.waitForSelector("#app"); 
            await page.type('input[id="login_email"]', 'dir@mail.ru');
            await page.type('input[id="login_password"]', '346488', { delay: 100 });
            await page.click('.ant-btn.ant-btn-primary.ant-btn-lg.ant-btn-block');
            await page.waitForSelector(".ant-table-row-cell-break-word");
            await page.screenshot({path: 'auth.png'});
        }
        
        async function Product()
        {
            var randomProd = faker.commerce.productName();
            var randomText = faker.lorem.sentence();
            var randomPrice = faker.commerce.price();

            for (let i = 0; i < 3; i++) 
            {
                await page.hover('div > .ant-btn.ant-btn-primary.ant-btn-lg.ant-dropdown-trigger');
                await page.waitForTimeout(3000);
                await page.waitForSelector(".ant-dropdown-menu-item");
                await page.click('.ant-dropdown-menu-item')
                .then(() => { page.waitForSelector('._title')});
                await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
                await page.waitForSelector('#user_name');
                
                await page.focus('input#user_name');
                await page.keyboard.sendCharacter(randomProd);
                    
                await page.type('input#user_vendor_code', `${Math.floor(Date.now() / 10)}`);
                    
                await page.click('#user_category_id');
                    for (let i = 0; i < 1; i++) {
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
                await page.keyboard.type(randomPrice);

                await page.focus('textarea#user_description');
                await page.keyboard.sendCharacter(randomText);

                await page.focus('textarea#user_comment');
                await page.keyboard.sendCharacter(randomText);
                    
                await page.click('.btn_green.ant-btn.ant-btn-lg');
                await page.waitForSelector(".ant-table-row-cell-break-word");

                await page.waitForTimeout(3000);

                await page.screenshot({path: `${Math.floor(Date.now() / 3)}` + ' - product.png'}); 

                await page.waitForSelector(".ant-table-row-cell-break-word");
            }

              
        }

        async function Shop()
        {
            var shopName = faker.company.companyName();
            var address = faker.address.streetAddress();
            var phone = faker.phone.phoneNumber();
            var randomText = faker.lorem.sentence();

            await page.click('.ant-menu > li:nth-child(6)')
            .then(() => page.waitForSelector(".ant-table-row-cell-break-word"));
            await page.click('.ant-btn.ant-btn-primary.ant-btn-lg');
            await page.waitForSelector('#shopsForm_name');

            await page.focus('input#shopsForm_name');
            await page.keyboard.sendCharacter(shopName); 

            await page.focus('input#shopsForm_address');
            await page.keyboard.sendCharacter(address);
            
            await page.focus('input#shopsForm_phone');
            await page.keyboard.sendCharacter(phone);
            
            await page.type('input#shopsForm_bin', `${Math.floor(Date.now() / 10)}`);
            
            await page.focus('textarea#shopsForm_comment');
            await page.keyboard.sendCharacter(randomText);

            await page.click('.btn_green.ant-btn.ant-btn-primary.ant-btn-lg');
            await page.waitForSelector(".ant-table-row-cell-break-word");

            await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
            await page.waitForSelector(".ant-table-row-cell-break-word");
        }
        
        async function Profile()
        {
            var name = faker.name.firstName() + ' ' + faker.name.lastName();

            await page.click('._user');
            await page.waitForSelector('.ant-btn.ant-btn-primary.ant-btn-lg');
            await page.click('.ant-btn.ant-btn-primary.ant-btn-lg');
            await page.waitForSelector('._title');

            await page.click('input#login_name', {clickCount: 3});
            await page.type('input#login_name', 'Director ' + name);

            await page.type('input#login_password', '346488');
            await page.type('input#login_password_confirm', '346488');

            await page.click('.btn_green.ant-btn.ant-btn-lg');
            await page.waitForSelector(".group_grid._gap_20");
        }

        async function Orders()
        {
            await page.click('.ant-menu > li:nth-child(10)');
            await page.waitForSelector(".ant-table-row-cell-break-word");

            await page.click('.ant-select-selection.ant-select-selection--single');
            for (let i = 0; i < 6; i++) {
                await page.keyboard.press('Tab');
            }
            await page.waitForTimeout(5000);
            
            for (let i = 0; i < 2; i++) {
                await page.keyboard.press('ArrowDown');
            }
            await page.keyboard.press('Enter');
            await page.waitForSelector(".ant-table-row-cell-break-word");
            await page.waitForTimeout(3000);

            await page.hover('td > .ant-dropdown-trigger');
            await page.waitForTimeout(3000);
            await page.waitForSelector(".ant-dropdown-menu-item");
            await page.click('.ant-dropdown-menu-item')
            .then(() => {
                page.waitForSelector('._title')
            })
            await page.waitForSelector(".ant-btn-lg")

            await page.click('.btn_orange.ant-btn.ant-btn-primary.ant-btn-lg');
            await page.waitForTimeout(5000);
        }

        await browser.close();
    }


    catch (e) {
        page.on('console', (msg) => console.log('OI-OI, OSHIBOCHKA!1!! ', msg.text()));    
    }

}

test();
