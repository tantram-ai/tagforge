const express = require('express');
const router = express.Router();
const { generate } = require('../controllers/generateController');
const { firebaseAuth } = require('../middlewares');

router.post('/generate', firebaseAuth, express.json(), generate);

module.exports = router;
