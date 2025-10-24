const express = require('express');
const { keywordSearch } = require('../controllers'); const { firebaseAuth, validateSubscription } = require('../middlewares');
const router = express.Router();
const middlewares = [firebaseAuth, validateSubscription]


router.post('/getKeywordsWithStats', middlewares, express.json(), keywordSearch)

module.exports = router