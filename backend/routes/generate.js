const express = require('express');
const router = express.Router();
const { firebaseAuth, validateSubscription } = require('../middlewares');
const { generate } = require('../controllers');
const middlewares = [firebaseAuth , validateSubscription ]

router.post('/generate', middlewares , express.json(), generate);

module.exports = router;
