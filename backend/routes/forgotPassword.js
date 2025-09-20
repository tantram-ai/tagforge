const express = require('express');
const router = express.Router();
const axios = require("axios");

const API_KEY = process.env.FIREBASE_API_KEY

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
            {
                requestType: "PASSWORD_RESET",
                email,
            }
        );

        res.json({ success: true, message: "Password reset email sent. Please check your inbox." });
    } catch (err) {
        res.status(400).json({ success: false, error: err.response?.data?.error?.message || err.message });
    }
});

module.exports = router