const express = require('express');
const router = express.Router();
const firebaseAuth = require('../middlewares/firebaseAuth');
const { stripeWebhook } = require('../controllers/stripeController');

router.post('/stripe', firebaseAuth, express.json(), stripeWebhook);

module.exports = router;
