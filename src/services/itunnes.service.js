const axios = require('axios');

module.exports = async (term,entity) => {
  const URL = `https://itunes.apple.com/search`
  try {
    const response = await axios.get(URL,{params:{term,entity}})
    return response.data
  } catch (error) {
    console.log('error',error);
    throw Error(error)
  }
}