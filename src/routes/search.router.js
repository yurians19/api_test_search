const { Router } = require('express');
const router = Router();

const { getBriggs, getHustler, getGardner } = require('../controllers/search.controller');

router.route('/SP')
    .get(getBriggs)

router.route('/CP')
.get(getHustler)

router.route('/GA')
.get(getGardner)

module.exports = router;