const express = require('express');
const router = express.Router();
const { saveMetaSet } = require('../controllers/metasController');
const { firebaseAuth } = require('../middlewares');

router.post('/metas', firebaseAuth, express.json(), saveMetaSet);

module.exports = router;
