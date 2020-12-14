const axios = require('axios');
const cheerio = require('cheerio')
const jsonfile = require('jsonfile')

module.exports = async ({ code, qty }) => {
  try {
    const {gardner} = await jsonfile.readFile('loginGardner.json')
    const {data: html} = await axios.request({  url:`https://www.gardnerinc.com/catalogsearch/result`,
    params:{q:code},
    headers: { Cookie: `store=default;  PHPSESSID=${gardner};`}
    })
    let $ = await cheerio.load(html)
    // const description = $("#maincontent > div.columns > div > table > tbody > tr:nth-child(1) > td.description").text().trim()
    // const stock = $("#maincontent > div.columns > div > table > tbody > tr:nth-child(1) > td.item-stock").text().trim()
    const quantityavailable = $("#maincontent > div.columns > div > table > tbody > tr:nth-child(1) > td.quantity-available").text().trim()
    const ListPrice = $("#maincontent > div.columns > div > table > tbody > tr:nth-child(1) > td.list-price").text().trim()
    const ActualCost = $("#maincontent > div.columns > div > table > tbody > tr:nth-child(1) > td.your-price").text().trim()
    if (ActualCost == "Login to view prices") {
      return null
    }
    let response = { status: "Out Stock", availability : 0, itemid: code, ActualCost: null, supersedes: null, IsNLA: null}
    if (quantityavailable >= qty) {
      response.ActualCost = ActualCost
      response.ListPrice = ListPrice
      response.status = "In Stock"
      response.itemid = code
      response.availability = quantityavailable
      response.supersedes = null
      response.IsNLA = null
    }
    return response
  } catch (error) {
    console.log(error);
    throw Error(error)
  }
}