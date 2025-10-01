const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_PATH || './serviceAccouey.jntKson';
const serviceAccount = require(path.resolve(keyPath));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // if used
  });
}

module.exports = {admin};
