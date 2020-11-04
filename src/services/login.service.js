const axios = require('axios');
const jsonfile = require('jsonfile')

module.exports = async ({ url ,username , password }) => {
  try {
    const {headers} = await axios.post(`${url}User/Login`,{"username":username,"password":password})
    await jsonfile.writeFile('login.json', {powerdistributors: headers['set-cookie'][1]})
  } catch (error) {
    throw Error(error)
  }
}