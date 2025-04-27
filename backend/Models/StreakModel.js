const mongoose = require('mongoose');
const { Schema } = mongoose;

const streakSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Referencing the User schema
    required: true,
  },
  streakCount: {
    type: Number,
    default: 0,
  },
  lastActiveDate: {
    type: Date,
    default: Date.now,
  },
  lastTaskCompleted: {
    type: String, // Store the task name if necessary
    default: '',
  },
  streakStartDate: {
    type: Date,
    default: Date.now,
  },
  completedDates: {
    type: [Date], // Array of dates
    default: [],
  },
  
});

module.exports = mongoose.model('Streak', streakSchema);
