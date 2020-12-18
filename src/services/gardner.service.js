const axios = require('axios')
const cheerio = require('cheerio')
const jsonfile = require('jsonfile')

module.exports = async ({ code, qty }) => {
  try {
    let page = 0
    let loopPage = true
    let itemLastPage = null
    let totalItem = null

    let element = null
    let superseded = null
    let ListPrice = null
    let ActualCost = null
    let quantityavailable = null
    let supersedes = null

    do {
      page++
      itemLastPage = null
      totalItem = null
      
      const {gardner} = await jsonfile.readFile('loginGardner.json')
      const {data: html} = await axios.request({  url:`https://www.gardnerinc.com/catalogsearch/result/index/`,params:{q:code,p:page},
      headers: { Cookie: `store=default;PHPSESSID=${gardner};`}
      })

      let $ = await cheerio.load(html)

      itemLastPage = $("#toolbar-amount > span:nth-child(2)").text().trim()
      totalItem = $("#toolbar-amount > span:nth-child(3)").text().trim()
      
      if (totalItem == '' || (itemLastPage == totalItem && totalItem != '')) {
        loopPage = false
      }
      
      let count = 0;
      let loop = true
      
      do {
        count++
        
        superseded =  null
        element = null
        ListPrice = null
        ActualCost = null
        ActualCost = null
        supersedes = null
        
        superseded = $(`#maincontent > div.columns > div > table > tbody > tr:nth-child(${count}) > th > p`).text().trim()
        element = $(`#maincontent > div.columns > div > table > tbody > tr:nth-child(${count}) > th > a`).text().trim()
        quantityavailable = $(`#maincontent > div.columns > div > table > tbody > tr:nth-child(${count}) > td.quantity-available`).text().trim()
        ListPrice = $(`#maincontent > div.columns > div > table > tbody > tr:nth-child(${count}) > td.list-price`).text().trim()
        ActualCost = $(`#maincontent > div.columns > div > table > tbody > tr:nth-child(${count}) > td.your-price`).text().trim()
        // description = $(`#maincontent > div.columns > div > table > tbody > tr:nth-child(${count}) > td.description`).text().trim()
        // stock = $(`#maincontent > div.columns > div > table > tbody > tr:nth-child(${count}) > td.item-stock`).text().trim()

        if (superseded) {
          supersedes = element.slice(element.indexOf(",")+1).trim()
        }

        if (ActualCost == "Login to view prices") {
          return 'Not authorized'
        }

        if (!loopPage && !quantityavailable) {
          return null
        }

        if (`HG, ${code}` == element || !quantityavailable) {
          loop = false
        }
      } while (loop);
      
    } while (loopPage);


    let response = {status: "Out Stock", availability : 0, itemid: element, ActualCost: null, supersedes: null, IsNLA: null}

    if (Number(quantityavailable) >= qty) {
      response.ActualCost = ActualCost
      response.ListPrice = ListPrice
      response.status = "In Stock"
      response.itemid = element
      response.availability = quantityavailable
      response.supersedes = supersedes
      response.IsNLA = null
    }

    return response
  } catch (error) {
    console.log(error);
    throw Error(error)
  }
}