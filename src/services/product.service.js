const axios = require('axios');
const jsonfile = require('jsonfile')


module.exports = async ({ code, qty ,url}) => {
  try {
    let response = { status: "Out Stock"} 
    const {powerdistributors} = await jsonfile.readFile('login.json')
    await axios.delete(`${url}/customapi/Cart/EmptyCart?cartType=regular?clearAdvite=false`,{headers:{Cookie: powerdistributors}})
    const {data : res} = await axios.request({url:`${url}/customapi/Product/Autocomplete`,params:{search:code},headers:{Cookie: powerdistributors}})
    const { Product: { Id } } = res[0]
    const {data} = await axios.request({url:`${url}/customapi/Product/Get/${Id}`,params:{qty,cartType:'regular'},headers:{Cookie: powerdistributors}})
    const {Product : {Availability,Supersedes,IsNLA}} = data
    if (Availability >= qty) {
      response.status = "In Stock"
      response.supersedes = Supersedes
      response.IsNLA = IsNLA
      response.quantity = Availability
    }
    return [data,res]
  } catch (error) {
    console.log('error',error);
    return null
  }
}