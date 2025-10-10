const axios = require("axios");
const { successWithMessage, internalServer } = require("../utils");
const API_KEY = process.env.FIREBASE_API_KEY


const resendVerificationMail = async (req, res) => {
    const { idToken } = req.body;
    try {
        const isMailSent = await axios.post(
            `${process.env.FIREBASE_BASE_URL}sendOobCode?key=${API_KEY}`,
            { requestType: "VERIFY_EMAIL", idToken, continueUrl: `${process.env.BASE_URL}/emailVerification` }
        );

        return successWithMessage(res, "Resend successful! Please verify your email.")
    } catch (err) {
        return internalServer(err, res)
    }
}

module.exports = { resendVerificationMail }