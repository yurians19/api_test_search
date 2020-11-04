const { login, product } = require('../services')
const searchCtrl = {};

searchCtrl.getSearch = async (req, res) => {
    try {
        const query = req.query
        if(Object.entries(query).length === 0)
         res.status(409).send({ message:'error al construir la peticion'})
        let data  = await product(query)
        if (!data) {
          await login(query)
          data = await product(query)
        }
        res.json(data)
    } catch (error) {
        console.log('error',error);
        res.status(500).send({ message:'error internal'})
    }
}

module.exports = searchCtrl;