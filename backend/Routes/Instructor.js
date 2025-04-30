const express = require('express');
const InstructorAuth = require('../Middlewares/InstructorAuth');
const { getInstructorData, updateInstructorProfile, updateInstructorSettings } = require('../Controllers/Instructor');


const InstructorRoutes = express.Router();

// Route to get instructor data
InstructorRoutes.get('/data',InstructorAuth , getInstructorData);

// Route to update instructor profile
InstructorRoutes.post('/update-profile', InstructorAuth, updateInstructorProfile);

// Route to update instructor settings (e.g., password change, notification preferences)
InstructorRoutes.post('/update-settings', InstructorAuth, updateInstructorSettings);

// Route to get instructor profile (alternative)
InstructorRoutes.get('/profile', InstructorAuth, getInstructorData);

module.exports = InstructorRoutes;
