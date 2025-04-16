const express = require('express');
const { saveUserLocation, getLocationCounts } = require('../Controllers/locationController');

const router = express.Router();

// Route to save the user's location
router.post('/locations/save', saveUserLocation);

// Route to get counts of users by location
router.get('/locations/counts', getLocationCounts);

module.exports = router; // Export the router to use in index.js
