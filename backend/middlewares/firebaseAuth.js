const { admin } = require('../connections');
const { users } = require('../models');
const { invelidToken } = require('../utils');

const firebaseAuth = async (req, res, next) => {
  const idToken = req?.cookies?.token || null;
  if (!idToken) {
    return invelidToken(res)
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
    return invelidToken()
  }
}

module.exports = { firebaseAuth }