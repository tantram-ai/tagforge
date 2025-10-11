const express = require('express');
const router = express.Router();
const { createProject, getProjectList, getProjectInfoById } = require('../controllers');
const { firebaseAuth, validateSubscription } = require('../middlewares');

const middlewares = [firebaseAuth, validateSubscription]

router.post('/createProject', middlewares, express.json(), createProject);
router.get('/getProjects', middlewares, express.json(), getProjectList);



module.exports = router;
