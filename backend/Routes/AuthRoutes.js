const express = require('express');
const AuthRoutes = express.Router();

const {
    isAuthenticated,
    login,
    logout,
    register,
    resetPassword,
    sendResetOtp,
    sendVerifyOtp,
    verifyEmail,
    verifyResetPasswordOTP
} = require('../Controllers/AuthController.js');
const UserAuth = require('../Middlewares/UserAuth.js');

// Test route
AuthRoutes.get('/', (req, res) => {
    res.send('Auth Router is working properly');
});

// Auth routes
AuthRoutes.post('/register', register);
AuthRoutes.post('/login', login);
AuthRoutes.post('/logout', logout);

AuthRoutes.post('/send-verify-otp', UserAuth, sendVerifyOtp);
AuthRoutes.post('/verify-account', UserAuth, verifyEmail);
AuthRoutes.get('/is-auth', UserAuth, isAuthenticated);

AuthRoutes.post('/send-reset-otp', sendResetOtp);
AuthRoutes.post('/verify-reset-password-otp', verifyResetPasswordOTP);

AuthRoutes.post('/reset-password', resetPassword);

module.exports = AuthRoutes;
