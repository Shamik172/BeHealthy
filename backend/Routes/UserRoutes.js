const express = require('express');
const router = express.Router();

// const userAuth = require('../middleware/userAuth.js');
const UserAuth = require('../Middlewares/UserAuth.js');
const { getUserData } = require('../controllers/userController.js');

router.get('/data', UserAuth, getUserData);

module.exports = router;
