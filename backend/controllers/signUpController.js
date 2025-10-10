const axios = require("axios");
const { admin } = require("../connections");
const { internalServer, successWithMessage, customError } = require("../utils");

const auth = admin.auth();
const API_KEY = process.env.FIREBASE_API_KEY


const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    // 1. Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // // 2. Store extra fields in Firestore
    // await db.collection("users").doc(userRecord.uid).set({
    //   firstName,
    //   lastName,
    //   email,
    //   createdAt: new Date(),
    // });

    // 3. Send verification email using Firebase REST API
    const signInRes = await axios.post(
      `${process.env.FIREBASE_BASE_URL}signInWithPassword?key=${API_KEY}`,
      { email, password, returnSecureToken: true }
    );

    const idToken = signInRes.data.idToken;

    const isMailSent = await axios.post(
      `${process.env.FIREBASE_BASE_URL}sendOobCode?key=${API_KEY}`,
      { requestType: "VERIFY_EMAIL", idToken, continueUrl: `${process.env.BASE_URL}/emailVerification` }
    );

    return successWithMessage(res, "Signup successful! Please verify your email.", { token: idToken })
  } catch (err) {
    if (err?.errorInfo?.code === "auth/email-already-exists") {
      return customError(res, "EMAIL_ALREADY_EXISTS", err.message)
    } else {
      return internalServer(err, res)
    }
  }
}

module.exports = { signup }