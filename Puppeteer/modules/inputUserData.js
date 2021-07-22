const inputUserData = async (email, password, page) => {
  await page.waitForSelector("#login_email")
  await page.focus('input[name=email]')
  await page.keyboard.type(email)
  await page.focus('input[name=password]')
  await page.keyboard.type(password)
  await page.waitForTimeout(500);
  await page.click('.ant-btn')
}

module.exports = {inputUserData}