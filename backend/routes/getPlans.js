const express = require('express');
const { getPlans } = require('../controllers');
const router = express.Router();

router.get('/getPlans',express.json(),getPlans)

module.exports = router