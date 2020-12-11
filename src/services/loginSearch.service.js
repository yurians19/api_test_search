const axios = require('axios');
const jsonfile = require('jsonfile')
const puppeteer = require('puppeteer')

module.exports = async ({ username , password }) => {
  try {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://www.gardnerinc.com/customer/account/login/");
    await page.type("#email", username)
    await page.type("#pass", password)
    await page.click("#send2");
    await page.waitForNavigation();
    let currentCookies = await page.cookies();
    const setCookies = currentCookies.find(x => x.name === 'PHPSESSID').value
    // await jsonfile.writeFile('loginGardner.json', {gardner: setCookies}) 
  } catch (error) {
    throw Error(error)
  }
}