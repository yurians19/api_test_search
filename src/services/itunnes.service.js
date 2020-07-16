const axios = require('axios');

module.exports = async (term,entity) => {
  const URL = `https://itunes.apple.com/search`
  try {
    const {data} = await axios.get(URL,{params:{term,entity}})
    return data
  } catch (error) {
    throw Error(error)
  }
}