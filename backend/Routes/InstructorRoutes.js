const { 
    login,
    logout,
    createInstructor,
    isInstructorAuthenticated,
    sendInstructorResetOtp,
    verifyInstructorResetPasswordOtp,
    resetInstructorPassword,

    getAllInstructors,
    getInstructorById,
    verifyInstructor,
    featureInstructor,
    updateAvailability,
    rateInstructor,
    getTopRatedInstructors,
    registerInstructor
} = require('../Controllers/InstructorControllers.js');

const express = require('express');
const InstructorAuth = require('../Middlewares/InstructorAuth.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Instructor Router is working properly');
});

router.post('/login', login);
router.post('/logout', logout);
router.post('/register',registerInstructor);
router.get('/is-auth', InstructorAuth, isInstructorAuthenticated);
router.post('/send-reset-otp', sendInstructorResetOtp);
router.post('/verify-reset-password-otp', verifyInstructorResetPasswordOtp);
router.post('/reset-password', resetInstructorPassword);

router.get('/', InstructorAuth ,getAllInstructors);
router.get('/:id', InstructorAuth ,getInstructorById);
router.post('/:id/verify', InstructorAuth ,verifyInstructor);
router.post('/:id/feature', InstructorAuth ,featureInstructor);
router.post('/:id/availability', InstructorAuth ,updateAvailability);
router.post('/:id/rate', InstructorAuth ,rateInstructor);
router.get('/top-rated', InstructorAuth ,getTopRatedInstructors);

module.exports = router;
