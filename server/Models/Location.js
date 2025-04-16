const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  userId: String,
  lat: Number,
  lng: Number,
  name: String,
});

module.exports = mongoose.model('Location', LocationSchema); // CommonJS export
