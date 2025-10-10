const express = require('express');
const router = express.Router();
const { firebaseAuth, validateSubscription } = require('../middlewares');
const { generateKeywords } = require('../controllers');
const middlewares = [firebaseAuth, validateSubscription]

router.post('/generateKeywords', middlewares, express.json(), generateKeywords);

module.exports = router;
