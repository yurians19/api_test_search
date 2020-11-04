const { login, product } = require('../services')
const searchCtrl = {};

searchCtrl.getSearch = async (req, res) => {
    try {
        const body = req.body
        if(!body)
         res.status(409).send({ message:'error al construir la peticion'})
        let data  = await product(body)
        if (!data) {
          await login(body)
          data = await product(body)
        }
        console.log('data',data);
        res.json(data)
    } catch (error) {
        console.log('error',error);
        res.status(500).send({ message:'error internal'})
    }
}

module.exports = searchCtrl;