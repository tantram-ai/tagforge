const express = require('express');
const router = express.Router();
const axios = require("axios");

const API_KEY = process.env.FIREBASE_API_KEY

router.post("/forgotPassword", async (req, res) => {
    const { email } = req.body;

    try {
        await axios.post(
            `${process.env.FIREBASE_BASE_URL}sendOobCode?key=${API_KEY}`,
            {
                requestType: "PASSWORD_RESET",
                email,
                continueUrl: "http://localhost:5173/changePassword",
            }
        );
       return res.status(200).json({ error: "", code: "SUCCESS", message: "Password reset email sent. Please check your inbox.", data: null })
    } catch (err) {
        res.status(400).json({ error: err, code: "INTERNAL_SERVER", message: err.response?.data?.error?.message || err.message, data: null })
    }
});

router.post("/resetPassword", async (req, res) => {
    const { oobCode, newPassword } = req.body;

    try {
        await axios.post(
            `${process.env.FIREBASE_BASE_URL}resetPassword?key=${API_KEY}`,
            {
                oobCode,
                newPassword,
            }
        );
        return res.status(200).json({ error: "", code: "SUCCESS", message: "Password has been reset successfully.", data: null })
    } catch (err) {
        return res.status(400).json({ error: "", code: "INTERNAL_SERVER", message: err.response?.data?.error?.message || err.message, data: null })
    }
});


module.exports = router