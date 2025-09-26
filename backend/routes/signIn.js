const express = require('express');
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

const subscriptionValidator = require('../utils/subscriptionValidator');

const API_KEY = process.env.FIREBASE_API_KEY



const validateAndCreateSession = async (res,idToken,uid) => {
  const { NOT_SUBSCRIBED, PLAN_EXPIRED, DATA, INTERNAL_SERVER } = await subscriptionValidator(uid)
  res.cookie("token", idToken, {
    httpOnly: false,        // prevents JavaScript access (XSS safe)
    secure: false,          // only works over HTTPS
    sameSite: "strict",    // CSRF protection
    maxAge: 60 * 60 * 1000 // 1 hour
  });

  const planData = jwt.sign(DATA, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("planData", planData, {
    httpOnly: false,
    secure: false,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000 // 1 hour
  });

  if (NOT_SUBSCRIBED) {
    return res.status(400).json({ error: "Subscription not found", code: "NOT_SUBSCRIBED", message: "Please subscribe a plan to start", data: null })
  }
  if (PLAN_EXPIRED) {
    return res.status(400).json({ error: "Plan expired", code: "PLAN_EXPIRED", message: "Please update the plan to continue", data: null })
  }
  if (INTERNAL_SERVER) {
    return res.status(500).json({ error: INTERNAL_SERVER, code: "INTERNAL_SERVER", message: "Internal Server Error", data: null });
  }
  return res.status(200).json({ error: "", code: "SUCCESS", message: "Succesfully logged in", data: null })
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
      { requestType: "VERIFY_EMAIL", idToken, continueUrl: "http://localhost:5173/emailVerification" }
    );
    return res.status(403).json({ error: "", code: "VERIFY_EMAIL", message: "Please verify your email first", data: {token:idToken} })
  }
  return user
}


router.post("/login", async (req, res) => {
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

    await validateAndCreateSession(res,idToken,user.localId)

  } catch (err) {
    return res.status(400).json({ error: err, code: err?.code, message: err.message, data: null })
  }
});

router.post("/googleLogin", async (req, res) => {
  try {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: err, code: "NO_TOKEN", message: "No auth token", data: null });
    }

    const idToken = authHeader.split(" ")[1]

    // Lookup user to check verification status
    const user = await checkverificationStatus(res, idToken)

    await validateAndCreateSession(res,idToken,user.localId)

  } catch (err) {
    return res.status(400).json({ error: err, code: "INTERNAL_SERVER", message: err.message, data: null })
  }
});

module.exports = router