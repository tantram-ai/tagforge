const express = require('express');
const { login, googleLogin } = require('../controllers');
const router = express.Router();

router.post('/login', express.json(), login);
router.post('/googleLogin', express.json(), googleLogin);

module.exports = router