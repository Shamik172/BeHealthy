const mongoose = require('mongoose');

const venueStatsSchema = new mongoose.Schema({
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  morningCount: {
    type: Number,
    default: 0
  },
  eveningCount: {
    type: Number,
    default: 0
  }
});

// Unique index on lat+lon combo inside the nested location
venueStatsSchema.index({ 'location.latitude': 1, 'location.longitude': 1 }, { unique: true });

const VenueStats = mongoose.model('VenueStats', venueStatsSchema);
module.exports = VenueStats;
