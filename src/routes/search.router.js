const { Router } = require('express');
const router = Router();

const { getSearch } = require('../controllers/search.controller');

router.route('/')
    .get(getSearch)

module.exports = router;