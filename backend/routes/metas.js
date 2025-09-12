const express = require('express');
const router = express.Router();
const firebaseAuth = require('../middlewares/firebaseAuth');
const { saveMetaSet } = require('../controllers/metasController');

router.post('/metas', firebaseAuth, express.json(), saveMetaSet);

module.exports = router;
