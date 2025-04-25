const express = require('express');
const { saveUserLocation } = require('../Controllers/venueController'); // Import the controller
const { fetchAllVenue } = require('../Controllers/venueController'); // Import the controller

const router = express.Router();

// Route to save the user's location 
router.post('/locations/save', saveUserLocation);
router.get('/locations/nearby', fetchAllVenue); // Route to fetch nearby locations 

module.exports = router; // Export the router to use in index.js
