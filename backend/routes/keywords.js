const express = require('express');
const { keywordSearch, getCompetitorKeywords } = require('../controllers'); const { firebaseAuth, validateSubscription } = require('../middlewares');
const router = express.Router();
const middlewares = [firebaseAuth, validateSubscription]


router.post('/getKeywordsWithStats', middlewares, express.json(), keywordSearch)
router.post('/getCompetitorKeywords', middlewares, express.json(), getCompetitorKeywords)


module.exports = router