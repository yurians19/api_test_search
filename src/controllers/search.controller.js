const { loginBriggs, briggs, hustler, loginHustler, gardner, loginGardner } = require('../services')
const searchCtrl = {};

searchCtrl.getBriggs = async (req, res) => {
    try {
        const query = req.query
        if(Object.entries(query).length === 0)
         res.status(409).send({ message:'error al construir la peticion'})
        let data  = await briggs(query)
        if (!data) {
          await loginBriggs(query)
          data = await briggs(query)
        }
        res.json(data)
    } catch (error) {
        console.log('error',error);
        res.status(500).send({ message:'error internal'})
    }
}

searchCtrl.getHustler = async (req, res) => {
    try {
        const query = req.query
        if(Object.entries(query).length === 0)
         res.status(409).send({ message:'error al construir la peticion'})
        let data  = await hustler(query)
        //if (!data) {
        //  await loginHustler(query)
        //  data = await hustler(query)
        //}
        res.json(data)
    } catch (error) {
        console.log('error',error);
        res.status(500).send({ message:'error internal'})
    }
}

searchCtrl.getGardner = async (req, res) => {
    try {
        const query = req.query
        if(Object.entries(query).length === 0)
         res.status(409).send({ message:'error al construir la peticion'})
        let data  = await gardner(query)
        if (data == 'Not authorized') {
         await loginGardner(query)
         data = await gardner(query)
        }
        res.json(data)
    } catch (error) {
        console.log('error',error);
        res.status(500).send({ message:'error internal'})
    }
}

module.exports = searchCtrl;