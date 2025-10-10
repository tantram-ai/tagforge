const axios = require("axios");
const { successWithMessage, customError } = require("../utils");
const API_KEY = process.env.FIREBASE_API_KEY


const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        await axios.post(
            `${process.env.FIREBASE_BASE_URL}sendOobCode?key=${API_KEY}`,
            {
                requestType: "PASSWORD_RESET",
                email,
                continueUrl: `${process.env.BASE_URL}/changePassword`,
            }
        );
        return successWithMessage(res, "Password reset email sent. Please check your inbox.")
    } catch (err) {
        return customError(res, "INTERNAL_SERVER", err.response?.data?.error?.message || err.message)
    }
}

const resetPassword = async (req, res) => {
    const { oobCode, newPassword } = req.body;

    try {
        await axios.post(
            `${process.env.FIREBASE_BASE_URL}resetPassword?key=${API_KEY}`,
            {
                oobCode,
                newPassword,
            }
        );
        return successWithMessage(res, "Password has been reset successfully.")
    } catch (err) {
        return customError(res, "INTERNAL_SERVER", err.response?.data?.error?.message || err.message)
    }
}

module.exports = { forgotPassword, resetPassword }