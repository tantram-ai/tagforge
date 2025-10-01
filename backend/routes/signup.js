const express = require('express');
const { signup } = require('../controllers');
const router = express.Router();


router.post('/signup', express.json(), signup)

module.exports = router


