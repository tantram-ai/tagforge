const express = require('express');
const firebaseAuth = require('../middlewares/firebaseAuth');
const { setPlan } = require('../controllers');
const router = express.Router();

const middlewares = [firebaseAuth]

router.post('/buyPlan',middlewares, express.json(), setPlan);


module.exports = router