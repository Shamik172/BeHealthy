const express = require('express');
const UserAuth = require('../Middlewares/UserAuth');
const { getUserData, updateProfile, updateSettings  } = require('../Controllers/UserController');
const UserRoutes = express.Router();


UserRoutes.get('/data', UserAuth , getUserData);

UserRoutes.post('/update-profile', UserAuth , updateProfile ) ;
  
UserRoutes.post('/update-settings', UserAuth , updateSettings) ;

UserRoutes.get('/profile', UserAuth , getUserData ) ;
module.exports = UserRoutes;
