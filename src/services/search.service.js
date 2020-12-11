const axios = require('axios');
// const jsonfile = require('jsonfile')

module.exports = async ({ code, qty }) => {
  try {
    const {gardner} = await jsonfile.readFile('cookieGardner.json')
    const {data} = await axios.request({  url:`https://www.gardnerinc.com/catalogsearch/result`,
    params:{q:'1015-1005R'},
    headers: { Cookie: `store=default;  PHPSESSID=b57a2b8e940ddc6a15fe485a9d95d285;`}
  })
  console.log(data);
/*   const { quantityavailable, pricelevel16, itemid } = items[0]
  let response = { status: "Out Stock", availability : 0, itemid: itemid, ActualCost: null, supersedes: null, IsNLA: null}
    if (quantityavailable >= qty) {
      response.ActualCost = pricelevel16
      response.status = "In Stock"
      response.itemid = itemid
      response.availability = quantityavailable
      response.supersedes = null
      response.IsNLA = null
    } */
    return data
  } catch (error) {
    throw Error(error)
  }
}