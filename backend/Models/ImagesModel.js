const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  altText: {
    type: String,
    default: ''
  },
  relatedAsana: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asana',
    required: false
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  tags: {
    type: [String],
    default: []
  },
  type: {
    type: String,
    enum: ['step', 'cover', 'icon', 'other'],
    default: 'other'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', imageSchema);
