const express = require('express');
const router = express.Router();
const axios = require("axios");

const API_KEY = process.env.FIREBASE_API_KEY

router.post('/resendVerification', async (req, res) => {
    const { idToken } = req.body;
    try {
        const isMailSent = await axios.post(
            `${process.env.FIREBASE_BASE_URL}sendOobCode?key=${API_KEY}`,
            { requestType: "VERIFY_EMAIL", idToken, continueUrl: "http://localhost:5173/emailVerification" }
        );

        return res.status(200).json({ error: "", code: "SUCCESS", message: "Resend successful! Please verify your email.", data: null })
    } catch (err) {
        return res.status(400).json({ error: err, code: "INTERNAL_SERVER", message: err.message, data: null })
    }
})

module.exports = router


