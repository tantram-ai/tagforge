const express = require('express');
const router = express.Router();
const { firebaseAuth, validateSubscription } = require('../middlewares');
const { generateKeywords, generateContent } = require('../controllers');
const middlewares = [firebaseAuth, validateSubscription]

router.post('/generateKeywords', middlewares, express.json(), generateKeywords);
router.post('/generateContent', middlewares, express.json(), generateContent);

module.exports = router;
