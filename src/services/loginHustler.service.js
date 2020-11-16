const axios = require('axios');
const jsonfile = require('jsonfile')

module.exports = async ({ username , password }) => {
  try {
    const options = {
      url:'https://www.cookspower.com/scs/services/Account.Login.Service.ss',
      method: 'POST',
      headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "x-sc-touchpoint": "checkout"
      },
      data: {
        email: username,
        password: password
      }
    }
    const { headers } = await axios(options)
    await jsonfile.writeFile('loginHustler.json', {cookspower: headers['set-cookie'].join('')})
  } catch (error) {
    throw Error(error)
  }
}