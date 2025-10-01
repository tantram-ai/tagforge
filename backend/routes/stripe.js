const express = require('express');
const router = express.Router();
const { stripeWebhook } = require('../controllers/stripeController');
const { firebaseAuth } = require('../middlewares');

router.post('/stripe', firebaseAuth, express.json(), stripeWebhook);

module.exports = router;
