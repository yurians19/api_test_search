var soap = require('soap');
const { setOriginEntity } = require('../lib')


module.exports = async  (name) => {
    var url = 'http://www.crcind.com/csp/samples/SOAP.Demo.CLS?WSDL=1';
    try {
      const soapClient = await soap.createClientAsync(url)
      return new Promise((resolve, reject) => {
        soapClient.GetListByName({name}, (err, result) => {
          let res = []
            if (err){
              reject(err)
            }
            if (result) { 
              const { GetListByNameResult: { PersonIdentification: crcindRes }} = result
              res = setOriginEntity(crcindRes,'person','crcind')
            }
            resolve(res)
          })
        })
    } catch (error) {
      throw error;
    }
  }