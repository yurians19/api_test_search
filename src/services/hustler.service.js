const axios = require('axios');
const jsonfile = require('jsonfile')

module.exports = async ({ code, qty }) => {
  try {
    let response = { status: "Out Stock",availability : 0}
    //const {cookspower} = await jsonfile.readFile('loginHustler.json')
    const {data: {items}} = await axios.request({  url:`https://www.cookspower.com/api/items?language=en&facet.exclude=custitem_item_customersegments&currency=USD&c=5226185&sitepath=%2Fscs%2FsearchApi.ssp&use_pcv=F&fieldset=details&n=2&custitem_item_customersegments=Excel%2CHustler&include=facets&country=US&pricelevel=16`,
                                          params:{url:code},
                                          //headers:{Cookie: cookspower}
                                        })
    const {quantityavailable, pricelevel16} = items[0]
    if (quantityavailable >= qty) {
      response.ActualCost = pricelevel16
      response.status = "In Stock"
      response.availability = quantityavailable
    }
    return [items[0],response]
  } catch (error) {
    if (error.response.status == 404) {
      return error.response.statusText
    }
    throw Error(error)
  }
}