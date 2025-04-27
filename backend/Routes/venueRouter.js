const express = require('express');
const { saveUserLocation } = require('../Controllers/venueController'); // Import the controller
const { fetchAllVenue } = require('../Controllers/venueController'); // Import the controller
const userAuth = require('../Middlewares/UserAuth')

const router = express.Router();

// Route to save the user's location 
router.post('/locations/save', userAuth, saveUserLocation);
router.get('/locations/nearby', userAuth, fetchAllVenue); // Route to fetch nearby locations 

module.exports = router; // Export the router to use in index.js
