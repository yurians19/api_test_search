const axios = require('axios');
const { setOriginEntity } = require('../lib')

module.exports = async q => {
  const URL = `http://api.tvmaze.com/search/shows`
  try {
    const {data} = await axios.get(URL,{params:{q}})
    return setOriginEntity([...new Set(data.map(item => item.show))],'shows','tvmaze')
  } catch (error) {
    throw error;
  }
}