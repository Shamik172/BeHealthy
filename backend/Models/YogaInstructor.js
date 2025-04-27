const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YogaInstructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Other'
  },
  dob: {
    type: Date,
    default: null
  },
  bio: {
    type: String,
    default: ''
  },
  profilePicture: {
    type: String,
    default: ''
  },
  coverPhoto: {
    type: String,
    default: '' // Banner or cover image
  },
  certifications: [
    {
      title: { type: String, required: true },
      issuedBy: { type: String, default: '' },
      issueDate: { type: Date, default: null },
      certificateLink: { type: String, default: '' } // Optional proof link
    }
  ],
  experienceYears: {
    type: Number,
    default: 0
  },
  specializations: {
    type: [String],
    default: []
  },
  teachingLanguages: {
    type: [String],
    default: ['English']
  },
  socialLinks: {
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' },
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  },
  location: {
    type: String,
    default: ''
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy', 'On Leave'],
    default: 'Available'
  },
  availableDays: {
    type: [String], // e.g., ['Monday', 'Wednesday', 'Friday']
    default: []
  },
  hourlyRate: {
    type: Number, // in your currency
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  achievements: {
    type: [String],
    default: []
  },
  featured: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  // classesOffered: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'YogaClass' // future relation if you have classes separately
  //   }
  // ]
}, { timestamps: true });

const YogaInstructor = mongoose.model('YogaInstructor', YogaInstructorSchema);

module.exports = YogaInstructor;
