const { crcind, tvmaze } = require('../services')
const { itunnes } = require('../lib')
const searchCtrl = {};

searchCtrl.getSearch = async (req, res) => {
    try {
        const term = req.query.term
        if(!term){
         res.status(409).send({ message:'error al construir la peticion'})
        }
        const crcindRes  = await crcind(term)
        const tvmazeRes  = await tvmaze(term)
        const itunnesRes = await itunnes(term)
        res.json(crcindRes.concat(tvmazeRes, itunnesRes))
    } catch (error) {
        console.log(error);
        res.status(500).send({ message:'error internal'})
    }
}

module.exports = searchCtrl;