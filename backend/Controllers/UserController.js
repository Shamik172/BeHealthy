const User = require('../Models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUserData = async (req, res) => {
    const userId = req.user?.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            console.log("User doesn't exist");
            return res.status(404).json({
                success: false,
                message: "User doesn't exist"
            });
        }

        return res.status(200).json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                gender: user.gender,
                dob: user.dob,
                phone: user.phone,
                location: user.location,
                goals: user.goals,
                socialLinks: user.socialLinks,
                role: user.role,               
            }
        });

    } catch (error) {
        console.log("Error in getUserData Controller:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Error: " + error.message
        });
    }
};



// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;// Assuming `userId` comes from a middleware or JWT token
    const { name, email, phone, gender, dob, location, goals, socialLinks, oldPassword, newPassword } = req.body;
    console.log("reached controller : " , req.body);
    console.log("UserId : " , userId);
    // Find the user by ID
    const user = await User.findById(userId);
    console.log("User : " , user) ;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle password change if both oldPassword and newPassword are provided
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }

      // Hash new password and update
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
    }

    // Update the user's profile information
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;
    user.location = location || user.location;
    user.goals = goals || user.goals;
    user.socialLinks = { ...user.socialLinks, ...socialLinks };
    console.log("User data Updated Success");
    // Save updated user
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob,
        location: user.location,
        goals: user.goals,
        socialLinks: user.socialLinks,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

// Controller to handle settings update (including password change)
const updateSettings = async (req, res) => {
  try {
    const userId = req.user?.id; 
    const { name, oldPassword, newPassword, notificationPref } = req.body;

    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if old password matches the stored password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect' });
    }

    // If new password is provided, hash and update it
    let updatedFields = { name};

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(newPassword, salt);
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });

    // Send the updated user data back to the client, excluding the password
    const userWithoutPassword = { ...updatedUser.toObject() };
    delete userWithoutPassword.password;

    // Respond with the updated user data
    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Error in updateSettings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Export all controller functions here
module.exports = {
    getUserData,
    updateProfile,
    updateSettings
};
