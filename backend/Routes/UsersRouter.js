const express = require('express');
const router = express.Router();
const User = require('../Models/User');

// Get all users (only name and email)
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'name email'); // Only select name and email
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
});

// Add new user (set default password and role)
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        // Set a default password and role
        const newUser = new User({
            name,
            email,
            password: 'defaultpassword', // You should generate a secure password or send an invite email in production
            role: 'user'
        });
        await newUser.save();
        res.json({ success: true, message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding user' });
    }
});

// Delete user by id
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting user' });
    }
});

module.exports = router;