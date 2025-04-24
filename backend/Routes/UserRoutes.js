const express = require('express');
const UserRouter = express.Router();

const UserAuth = require('../Middlewares/UserAuth.js');
const { getUserData } = require('../Controllers/UserController.js');

UserRouter.get('/data', UserAuth, getUserData);

module.exports = UserRouter;
