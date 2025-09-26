const admin = require('../connections/firebase/firebaseAdmin');
const { users } = require('../models');

module.exports = firebaseAuth = async (req, res, next) => {
  const idToken = req?.cookies?.token || null;

  if (!idToken) {
    return res.status(401).json({ error: err, code: "NO_TOKEN", message: "No auth token", data: null });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    // find or create user in DB
    let user = await users.findOne({ where: { uid: decoded.uid } });
    if (!user) {
      user = await users.create({
        uid: decoded.uid,
        email: decoded.email,
        displayName: decoded.name,
        photoURL: decoded.picture
      });
    }

    req.user = user;
    req.firebaseUser = decoded;
    next();
  } catch (err) {
    console.error('Firebase verify error', err);
    return res.status(401).json({ error: err, code: "INVALID_TOKEN", message: "Invalid auth token", data: null });
  }
}
