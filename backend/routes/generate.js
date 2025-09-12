const express = require('express');
const router = express.Router();
const firebaseAuth = require('../middlewares/firebaseAuth');
const { generate } = require('../controllers/generateController');

router.post('/generate', firebaseAuth, express.json(), generate);

module.exports = router;
