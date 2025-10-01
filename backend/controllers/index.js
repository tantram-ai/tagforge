const { forgotPassword, resetPassword } = require("./forgotPasswordController");
const { getPlans } = require("./getPlansController");
const { login, googleLogin } = require("./loginController");
const { setPlan } = require("./setPlanController");
const { signup } = require("./signUpController");
const { resendVerificationMail } = require("./verificationMailController");


module.exports = {
    setPlan,
    login,
    googleLogin,
    forgotPassword,
    resetPassword,
    getPlans,
    resendVerificationMail,
    signup
}