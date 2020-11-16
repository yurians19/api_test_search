const axios = require('axios');
const jsonfile = require('jsonfile')

module.exports = async ({ code, qty }) => {
  try {
    let response = { status: "Out Stock"}
    const {cookspower} = await jsonfile.readFile('loginBriggs.json')
    const {data} = await axios.request({  url:`https://www.cookspower.com/scs/services/LiveOrder.Service.ss`,
                                          params:{c:code,n:qty},
                                          headers:{Cookie: cookspower}
                                        })
    return data
  } catch (error) {
    console.log('error',error);
    return null
  }
}