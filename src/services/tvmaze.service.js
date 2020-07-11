const axios = require('axios');
const { setOriginEntity } = require('../lib')

module.exports = async q => {
  const URL = `http://api.tvmaze.com/search/shows`
  try {
    const response = await axios.get(URL,{params:{q}})
    return setOriginEntity(response.data,'shows','tvmaze')
  } catch (error) {
    throw error;
  }
}