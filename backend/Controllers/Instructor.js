const YogaInstructor = require('../Models/YogaInstructor.js');
const bcrypt = require('bcryptjs');

// Controller to get Yoga Instructor data
const getInstructorData = async (req, res) => {
    // Log when the controller is called
    // console.log("getInstructorData controller called");

    // Ensure that req.instructor exists and has the id
    const instructorId = req.user?.id;  // Use req.user, not req.instructor


    console.log("Instructor ID from request:", instructorId);

    // If instructorId is not present, return an error
    if (!instructorId) {
        console.log("Instructor not authenticated or token invalid.");
        return res.status(400).json({
            success: false,
            message: "Instructor not authenticated or token invalid."
        });
    }

    try {
        // Log before querying the database
        console.log("Fetching instructor data from database...");

        const instructor = await YogaInstructor.findById(instructorId);

        // If instructor is not found, log the issue and return 404
        if (!instructor) {
            console.log("Instructor doesn't exist in the database");
            return res.status(404).json({
                success: false,
                message: "Instructor doesn't exist"
            });
        }

        // Log the fetched instructor data
        console.log("Instructor data fetched:", instructor);

        // Successfully found the instructor, return the data
        return res.status(200).json({
            success: true,
            instructorData: {
                name: instructor.name,
                email: instructor.email,
                phone: instructor.phone,
                gender: instructor.gender,
                dob: instructor.dob,
                bio: instructor.bio,
                profilePicture: instructor.profilePicture,
                coverPhoto: instructor.coverPhoto,
                certifications: instructor.certifications,
                experienceYears: instructor.experienceYears,
                specializations: instructor.specializations,
                teachingLanguages: instructor.teachingLanguages,
                socialLinks: instructor.socialLinks,
                location: instructor.location,
                availability: instructor.availability,
                availableDays: instructor.availableDays,
                hourlyRate: instructor.hourlyRate,
                rating: instructor.rating,
                totalReviews: instructor.totalReviews,
                achievements: instructor.achievements,
                featured: instructor.featured,
                isVerified: instructor.isVerified,
            }
        });
    } catch (error) {
        // Catch and log any errors that occur
        console.error("Error in getInstructorData Controller:", error.message);
        return res.status(500).json({
            success: false,
            message: `Server Error: ${error.message}`
        });
    }
};


// Controller to update instructor profile
const updateInstructorProfile = async (req, res) => {
    const instructorId = req.user?.id;
    const { name, email, phone, gender, dob, bio, profilePicture, coverPhoto, certifications, experienceYears, specializations, teachingLanguages, socialLinks, location, availability, availableDays, hourlyRate } = req.body;

    try {
        const instructor = await YogaInstructor.findById(instructorId);

        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        // Update the instructor's profile information
        instructor.name = name || instructor.name;
        instructor.email = email || instructor.email;
        instructor.phone = phone || instructor.phone;
        instructor.gender = gender || instructor.gender;
        instructor.dob = dob || instructor.dob;
        instructor.bio = bio || instructor.bio;
        instructor.profilePicture = profilePicture || instructor.profilePicture;
        instructor.coverPhoto = coverPhoto || instructor.coverPhoto;
        instructor.certifications = certifications || instructor.certifications;
        instructor.experienceYears = experienceYears || instructor.experienceYears;
        instructor.specializations = specializations || instructor.specializations;
        instructor.teachingLanguages = teachingLanguages || instructor.teachingLanguages;
        instructor.socialLinks = { ...instructor.socialLinks, ...socialLinks };
        instructor.location = location || instructor.location;
        instructor.availability = availability || instructor.availability;
        instructor.availableDays = availableDays || instructor.availableDays;
        instructor.hourlyRate = hourlyRate || instructor.hourlyRate;

        // Save updated instructor
        await instructor.save();

        res.status(200).json({
            message: 'Instructor profile updated successfully',
            instructor: {
                name: instructor.name,
                email: instructor.email,
                phone: instructor.phone,
                gender: instructor.gender,
                dob: instructor.dob,
                bio: instructor.bio,
                profilePicture: instructor.profilePicture,
                coverPhoto: instructor.coverPhoto,
                certifications: instructor.certifications,
                experienceYears: instructor.experienceYears,
                specializations: instructor.specializations,
                teachingLanguages: instructor.teachingLanguages,
                socialLinks: instructor.socialLinks,
                location: instructor.location,
                availability: instructor.availability,
                availableDays: instructor.availableDays,
                hourlyRate: instructor.hourlyRate,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
};

// Controller to update instructor settings (including password change if needed)
const updateInstructorSettings = async (req, res) => {
    const instructorId = req.user?.id;
    const { name, oldPassword, newPassword, notificationPref } = req.body;

    try {
        const instructor = await YogaInstructor.findById(instructorId);

        if (!instructor) {
            return res.status(404).json({ success: false, message: 'Instructor not found' });
        }

        // Handle password change
        if (oldPassword && newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, instructor.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'Old password is incorrect' });
            }

            const salt = await bcrypt.genSalt(10);
            instructor.password = await bcrypt.hash(newPassword, salt);
        }

        // Update any other settings
        if (name) instructor.name = name;
        if (notificationPref) instructor.notificationPref = notificationPref;

        // Save updated instructor settings
        await instructor.save();

        res.status(200).json({
            success: true,
            message: 'Instructor settings updated successfully',
        });
    } catch (error) {
        console.error('Error in updateInstructorSettings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getInstructorData,
    updateInstructorProfile,
    updateInstructorSettings,
};
