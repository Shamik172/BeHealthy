// routes/adminRoutes.js

const express = require('express');
const { loginAdmin } = require('../Controllers/adminController');

const router = express.Router();

// Only login route
router.post('/login', loginAdmin);

module.exports = router;
