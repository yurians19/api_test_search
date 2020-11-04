const { Router } = require('express');
const router = Router();

const { getSearch } = require('../controllers/search.controller');

router.route('/')
    .post(getSearch)

module.exports = router;