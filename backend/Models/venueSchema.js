const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new mongoose.Schema({
  location: {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    //   unique: false, // We will enforce 1 per slot in logic
    // },
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
  // slot: {
  //   type: String,
  //   enum: ['Morning', 'Evening'],
  //   required: true,
  // },
  // slotCounts: {
  //   Morning: {
  //     type: Number,
  //     default: 0,
  //   },
  //   Evening: {
  //     type: Number,
  //     default: 0,
  //   },
  // },
});

// Geospatial index for MongoDB geolocation queries
venueSchema.index({ location: '2dsphere' });

const venueModel = mongoose.model("Venue", venueSchema);
module.exports = venueModel;
