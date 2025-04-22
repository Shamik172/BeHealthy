const express = require('express');
const router = express.Router();

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
router.get('/', (req, res) => {
    res.send('Auth Router is working properly');
});

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.post('/send-verify-otp', UserAuth, sendVerifyOtp);
router.post('/verify-account', UserAuth, verifyEmail);
router.get('/is-auth', UserAuth, isAuthenticated);

router.post('/send-reset-otp', sendResetOtp);
router.post('/verify-reset-password-otp', verifyResetPasswordOTP);
router.post('/reset-password', resetPassword);

module.exports = router;
