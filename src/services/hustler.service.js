const axios = require('axios');
const jsonfile = require('jsonfile')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')



module.exports = async ({ code, qty }) => {
  try {
    let response = { status: "Out Stock"}
    const {data} = await axios.request({url:`https://www.cookspower.com/007898`})
    // const browser = await puppeteer.launch({headless: false})
    // const page = await browser.newPage();
    // await page.setDefaultNavigationTimeout(0);
    // await page.goto('https://www.cookspower.com/007898');
    return data
  } catch (error) {
    console.log('error',error);
    return null
  }
}