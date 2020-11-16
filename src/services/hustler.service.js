const axios = require('axios');
const jsonfile = require('jsonfile')
const cheerio = require('cheerio')
const fetch = require('fetch')
const puppeteer = require('puppeteer')



module.exports = async ({ code, qty }) => {
  try {
    let response = { status: "Out Stock"}
    const options = {
      url:'https://www.cookspower.com/scs/services/Account.Login.Service.ss',
      method: 'POST',
      headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "x-sc-touchpoint": "checkout"
      },
      data: {
        email: 'admin2@prontomowers.com',
        password: 'Hustler123'
      }
    }
    const { headers } = await axios(options)
    const {data} = await axios.request({url:`https://www.cookspower.com/scs/services/LiveOrder.Service.ss`,
      params:{c:"5226185",n:2},headers:{Cookie: headers['set-cookie'].join('')}})


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