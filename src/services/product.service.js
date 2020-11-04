const axios = require('axios');
const jsonfile = require('jsonfile')


module.exports = async ({ code, qty ,url}) => {
  try {
    let response = { status: "Out Stock"} 
    const {powerdistributors} = await jsonfile.readFile('login.json')
    // const res_ =await axios.delete({url:`${url}/customapi/Cart/EmptyCart`,params:{clearAdvite:false,cartType:'regular'},headers:{Cookie: powerdistributors}})
    // console.log('res_',res_);
    const {data : res} = await axios.request({url:`${url}/customapi/Product/Autocomplete`,params:{search:code},headers:{Cookie: powerdistributors}})
    const { Product: { Id } } = res[0]
    const {data} = await axios.request({url:`${url}/customapi/Product/Get/${Id}`,params:{qty,cartType:'regular'},headers:{Cookie: powerdistributors}})
    console.log(data);
    const {Product : {Availability}} = data
    if (Availability >= qty) {
      response.status = "In Stock"
      response.quantity = Availability
    }
    return response
  } catch (error) {
    console.log('error',error);
    return null
  }
}