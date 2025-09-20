const express = require('express');
const router = express.Router();
const axios = require("axios");

const API_KEY = process.env.FIREBASE_API_KEY

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use Firebase REST API to login
    const loginRes = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      { email, password, returnSecureToken: true }
    );

    const { idToken } = loginRes.data;

    // Lookup user to check verification status
    const lookupRes = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      { idToken }
    );

    const user = lookupRes.data.users[0];
    if (!user.emailVerified) {
      return res.status(403).json({ error: "", code: "VERIFY_EMAIL", message: "Please verify your email first", data: null })
    }

    res.cookie("token", idToken, {
      httpOnly: true,        // prevents JavaScript access (XSS safe)
      secure: false,          // only works over HTTPS
      sameSite: "strict",    // CSRF protection
      maxAge: 60 * 60 * 1000 // 1 hour
    });
    res.status(200).json({ error: "", code: "SUCCESS", message: "Succesfully logged in", data: null })

  } catch (err) {
    res.status(400).json({ error: err, code: "INTERNAL_SERVER", message: err.message, data: null })
  }
});

module.exports = router