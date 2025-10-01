const express = require('express');
const { setPlan } = require('../controllers');
const { firebaseAuth } = require('../middlewares');
const router = express.Router();

const middlewares = [firebaseAuth]

router.post('/buyPlan',middlewares, express.json(), setPlan);

module.exports = router