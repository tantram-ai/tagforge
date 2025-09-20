const express = require('express');
const router = express.Router();
const axios = require("axios");

const API_KEY = process.env.FIREBASE_API_KEY

router.post('/resendVerification', async (req, res) => {
    const { email, password } = req.body;
    try {
        const signInRes = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            { email, password, returnSecureToken: true }
        );

        const idToken = signInRes.data.idToken;

        const isMailSent = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
            { requestType: "VERIFY_EMAIL", idToken, continueUrl: "http://localhost:5173/login" }
        );

        res.status(200).json({ error: "", code: "SUCCESS", message: "Signup successful! Please verify your email.", data: null })
    } catch (err) {
        res.status(400).json({ error: err, code: "INTERNAL_SERVER", message: err.message, data: null })
    }
})

module.exports = router


