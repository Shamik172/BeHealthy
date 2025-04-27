const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
  },
});

// Geospatial index for MongoDB geolocation queries
venueSchema.index({ location: '2dsphere' });

const venueModel = mongoose.model("Venue", venueSchema);
module.exports = venueModel;
