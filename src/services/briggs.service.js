const axios = require('axios');
const jsonfile = require('jsonfile')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')



module.exports = async ({ code, qty }) => {
  try {
    const {powerdistributors} = await jsonfile.readFile('loginBriggs.json')
    await axios.delete(`https://www.powerdistributors.com/customapi/Cart/EmptyCart?cartType=regular?clearAdvite=false`,{headers:{Cookie: powerdistributors}})
    const {data : res} = await axios.request({url:`https://www.powerdistributors.com/customapi/Product/Autocomplete`,params:{search:code},headers:{Cookie: powerdistributors}})
    const { Product: { Id } } = res[0]
    const {data} = await axios.request({url:`https://www.powerdistributors.com/customapi/Product/Get/${Id}`,params:{qty,cartType:'regular'},headers:{Cookie: powerdistributors}})
    const { Product : { Supersedes, IsNLA, ListPrice, ActualCost, DealerCost, SmartshipQuantity } } = data
    const browser = await puppeteer.launch(/* {headless: false} */)
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setCookie(  { name: '.AspNet.Cookies',
    value:powerdistributors.slice(powerdistributors.indexOf('=')+1, powerdistributors.indexOf(';')),
    domain: 'www.powerdistributors.com',
    path: '/',
    httpOnly: true,
    secure: true,
    session: false });
    await page.goto('https://www.powerdistributors.com/portal/build-order');
    let html = await page.content();
    await browser.close();
    let $ = await cheerio.load(html)
    let availability = 0
    let available = $("#order-builder-search > div.ob__results > ul > li:nth-child(1) > div > div.ob__results__li.ob__results__center-result > div > div.order-avail.order_sh > div > span:nth-child(1)").text().trim();
    if (available) {
      availability = Number(available.match(/\d+/)[0])
    }
    const quantityavailable = availability + SmartshipQuantity
    let response = { status: "Out Stock", availability : 0, DealerCost: null, ActualCost: null, supersedes: null, IsNLA: null, ListPrice: null}
    if (quantityavailable >= qty) {
      response.status = "In Stock"
      response.availability = quantityavailable
      response.supersedes = Supersedes
      response.IsNLA = IsNLA
      response.ListPrice = ListPrice
      response.DealerCost = DealerCost
      response.ActualCost = ActualCost
    }
    return response
  } catch (error) {
    console.log('error',error);
    return null
  }
}

