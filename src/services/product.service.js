const axios = require('axios');
const jsonfile = require('jsonfile')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')



module.exports = async ({ code, qty ,url}) => {
  try {
    let response = { status: "Out Stock"} 
    const {powerdistributors} = await jsonfile.readFile('login.json')
    await axios.delete(`${url}/customapi/Cart/EmptyCart?cartType=regular?clearAdvite=false`,{headers:{Cookie: powerdistributors}})
    const {data : res} = await axios.request({url:`https://www.powerdistributors.com/customapi/Product/Autocomplete`,params:{search:code},headers:{Cookie: powerdistributors}})
    const { Product: { Id } } = res[0]
    const {data} = await axios.request({url:`${url}/customapi/Product/Get/${Id}`,params:{qty,cartType:'regular'},headers:{Cookie: powerdistributors}})
    const {Product : {Supersedes,IsNLA}} = data
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
    await page.goto('https://www.powerdistributors.com/portal/build-order'); // Opens page as logged user
    let html = await page.content();
    await browser.close();
    let $ = await cheerio.load(html)
    const element = $("#order-builder-search > div.ob__results > ul > li:nth-child(1) > div > div.ob__results__li.ob__results__center-result > i").attr('class');
    if (element != 'ob__overview__icon alert fa fa-exclamation-triangle') {
      response.status = "In Stock"
      response.supersedes = Supersedes
      response.IsNLA = IsNLA
    }
    return response
  } catch (error) {
    console.log('error',error);
    return null
  }
}

