const axios = require("axios");
const jwt = require("jsonwebtoken");
const {
    cookieSettings,
    subscriptionValidator,
    internalServer,
    invelidToken,
    verifyEmail,
    successWithMessage,
    customError } = require('../utils');

const API_KEY = process.env.FIREBASE_API_KEY

const validateAndCreateSession = async (res, idToken, uid) => {
    const { NOT_SUBSCRIBED, PLAN_EXPIRED, DATA, INTERNAL_SERVER } = await subscriptionValidator(uid)
    res.cookie("token", idToken, cookieSettings);

    const planData = jwt.sign(DATA, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.cookie("planData", planData, cookieSettings);

    if (NOT_SUBSCRIBED) {
        return customError(res, "NOT_SUBSCRIBED", "Please subscribe a plan to start")
    }
    if (PLAN_EXPIRED) {
        return customError(res, "PLAN_EXPIRED", "Please update the plan to continue")
    }
    if (INTERNAL_SERVER) {
        return internalServer(INTERNAL_SERVER, res)
    }
    return successWithMessage(res, "Succesfully logged in")
}

const checkverificationStatus = async (res, idToken) => {
    const lookupRes = await axios.post(
        `${process.env.FIREBASE_BASE_URL}lookup?key=${API_KEY}`,
        { idToken }
    );

    const user = lookupRes.data.users[0];
    if (!user.emailVerified) {
        const isMailSent = await axios.post(
            `${process.env.FIREBASE_BASE_URL}sendOobCode?key=${API_KEY}`,
            { requestType: "VERIFY_EMAIL", idToken, continueUrl: `${process.env.BASE_URL}/emailVerification` }
        );
        return verifyEmail(res, idToken)
    }
    return user
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Use Firebase REST API to login
        const loginRes = await axios.post(
            `${process.env.FIREBASE_BASE_URL}signInWithPassword?key=${API_KEY}`,
            { email, password, returnSecureToken: true }
        );

        const { idToken } = loginRes.data;

        // Lookup user to check verification status
        const user = await checkverificationStatus(res, idToken)

        await validateAndCreateSession(res, idToken, user.localId)

    } catch (err) {
        return internalServer(err, res)
    }
}

const googleLogin = async (req, res) => {
    try {

        const authHeader = req?.headers?.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return invelidToken(res)
        }

        const idToken = authHeader.split(" ")[1]

        // Lookup user to check verification status
        const user = await checkverificationStatus(res, idToken)

        await validateAndCreateSession(res, idToken, user.localId)

    } catch (err) {
        return internalServer(err, res)
    }
}

module.exports = { login, googleLogin }