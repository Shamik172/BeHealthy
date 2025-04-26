const mongoose = require('mongoose');
const { Schema } = mongoose;

const completedAsanaSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  asanaId: { type: Schema.Types.ObjectId, ref: 'Asana', required: true },
  completedAt: { type: Date, default: Date.now }
});

const CompletedAsana = mongoose.model('CompletedAsana', completedAsanaSchema);

module.exports = CompletedAsana;
