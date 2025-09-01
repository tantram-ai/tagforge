const admin = require('../connections/firebase/firebaseAdmin');
const { users } = require('../models');

module.exports = firebaseAuth = async (req, res, next)=>{
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.*)$/);
  if (!match) {
    return res.status(401).json({ error: 'No auth token'});
  }

  const idToken = match[1];

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
    return res.status(401).json({ error: 'Invalid auth token' });
  }
}
