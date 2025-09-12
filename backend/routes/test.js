const express = require('express');
const firebaseAuth = require('../middlewares/firebaseAuth');
const validateSubscription = require('../middlewares/validateSubscription');
const router = express.Router();
const middlewares = [firebaseAuth , validateSubscription]
router.get('/test', middlewares ,(req,res)=>{
    res.send({message:"success"})
})

module.exports =  router