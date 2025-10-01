const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers');
const router = express.Router();


router.post('/forgotPassword', express.json(), forgotPassword);
router.post('/resetPassword', express.json(), resetPassword);


module.exports = router