const express = require('express');
const router = express.Router();
const firebaseAuth = require('../middlewares/firebaseAuth');
const validateSubscription = require('../middlewares/validateSubscription');

const middlewares = [firebaseAuth , validateSubscription]

router.post('/test', middlewares , express.json());

module.exports = router;
