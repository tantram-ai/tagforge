const axios = require("axios");
const API_KEY = process.env.FIREBASE_API_KEY


const resendVerificationMail = async (req,res) =>{
    const { idToken } = req.body;
    try {
        const isMailSent = await axios.post(
            `${process.env.FIREBASE_BASE_URL}sendOobCode?key=${API_KEY}`,
            { requestType: "VERIFY_EMAIL", idToken, continueUrl: `${process.env.BASE_URL}/emailVerification` }
        );

        return res.status(200).json({ error: "", code: "SUCCESS", message: "Resend successful! Please verify your email.", data: null })
    } catch (err) {
        return res.status(400).json({ error: err, code: "INTERNAL_SERVER", message: err.message, data: null })
    }
}

module.exports = {resendVerificationMail}