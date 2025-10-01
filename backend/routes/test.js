const express = require('express');
const { firebaseAuth, validateSubscription } = require('../middlewares');
const router = express.Router();
const middlewares = [firebaseAuth, validateSubscription]

router.get('/test', middlewares, (req, res) => {
    res.send({ message: "success" })
})

module.exports = router