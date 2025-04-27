const mongoose = require('mongoose');

const allowedEmails = [
  "harshit52pal@gmail.com",
  "shamik52mandal@gmail.com",
  "anantesh52chauhan@gmail.com"
];

const adminSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return allowedEmails.includes(email);  // ✅ sirf allowed emails
            },
            message: "This email is not authorized for admin access."
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (password) {
                return password === "123456789";  // ✅ sirf ek fixed password
            },
            message: "Invalid password. Only fixed password allowed."
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
