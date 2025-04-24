const express = require('express');
const router = express.Router();
const venueStatsController = require('../Controllers/venueStatsController'); // Adjust path accordingly

// Get venue stats by location (lat, lon)
router.get('/location/getlocation', venueStatsController.getVenueStatsByLocation);

// Update venue stats (can be used for incrementing counts, etc.)
// router.put('/location/putlocation', venueStatsController.updateVenueStats);
router.post('/location/putlocation', venueStatsController.updateVenueStats);


module.exports = router;
