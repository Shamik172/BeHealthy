const express = require('express');
const router = express.Router(); // ✅ Ensure `Router()` is correctly initialized

const { signup, login } = require('../Controllers/AuthController.js');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation.js');



router.post('/login', loginValidation, login); 
router.post('/signup', signupValidation, signup); // ✅ Ensure signup function is correctly used

module.exports = router;
