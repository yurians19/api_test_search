const { Router } = require('express');
const router = Router();

const { getBriggs, getHustler } = require('../controllers/search.controller');

router.route('/SP')
    .get(getBriggs)

router.route('/CP')
.get(getHustler)

module.exports = router;