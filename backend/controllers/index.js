const { generate } = require("./aiGenerateController");
const { getCompetitorKeywords } = require("./competitorUrlSearchController");
const { generateContent } = require("./contentGenerationController");
const { forgotPassword, resetPassword } = require("./forgotPasswordController");
const { getPlans } = require("./getPlansController");
const { generateKeywords } = require("./keywordController");
const { keywordSearch } = require("./keywordSearchController");
const { login, googleLogin } = require("./loginController");
const { createProject, getProjectList } = require("./projectController");
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
    signup,
    generate,
    createProject,
    getProjectList,
    generateKeywords,
    keywordSearch,
    generateContent,
    getCompetitorKeywords
}