const axios = require('axios');
const jsonfile = require('jsonfile')

module.exports = async ({ username , password }) => {
  try {
    const {headers} = await axios.post(`https://www.powerdistributors.com/customapi/User/Login`,{"username":username,"password":password})
    await jsonfile.writeFile('loginBriggs.json', {powerdistributors: headers['set-cookie'][1]})
  } catch (error) {
    throw Error(error)
  }
}