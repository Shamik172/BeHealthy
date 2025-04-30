const mongoose = require("mongoose");
const User = require("./User.js");
const streakSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
  },
  lastDate: {
    type: Date
  },
  highest: {
    type: Number,
    default: 0
  },
  history: [{
    type: Date
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Streak", streakSchema);
