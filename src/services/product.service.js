const axios = require('axios');
const jsonfile = require('jsonfile')


module.exports = async ({ code, qty ,url}) => {
  try {
    const {powerdistributors} = await jsonfile.readFile('login.json')
    const {data} = await axios.request({url:`${url}Product/Get/${code}`,params:{qty,cartType:'regular'},headers:{Cookie: powerdistributors}})
    return data
  } catch (error) {
    console.log('error');
    return null
  }
}