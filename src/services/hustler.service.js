const axios = require('axios');
const jsonfile = require('jsonfile')

module.exports = async ({ code, qty }) => {
  try {
    let response = { status: "Out Stock",availability : 0}
    const {cookspower} = await jsonfile.readFile('loginHustler.json')
    const {data: { lines }} = await axios.request({  url:`https://www.cookspower.com/scs/services/LiveOrder.Service.ss`,
                                          params:{c:code,n:qty},
                                          headers:{Cookie: cookspower}
                                        })
    if (lines.length == 0) {
      return null
    }
    const {item: { isinstock }} = lines[0]
    const {quantity, rate} = lines[0]
    if (isinstock) {
      response.ActualCost = rate
      response.status = "In Stock"
      response.availability = quantity
    }
    return lines
  } catch (error) {
    throw Error(error)
  }
}