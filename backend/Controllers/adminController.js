const Admin = require('../Models/Admin');

// Allowed emails and fixed password
const allowedEmails = [
  "harshit52pal@gmail.com",
  "shamik52mandal@gmail.com",
  "anantesh52chauhan@gmail.com"
];
const fixedPassword = "123456789";

// Admin Login Only
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", req.body); // Log the email for debugging
  try {
    // Ensure the first three allowed emails are saved in the database if they don't already exist
    for (let emailItem of allowedEmails) {
      let admin = await Admin.findOne({ email: emailItem });
      if (!admin) {
        admin = new Admin({ email: emailItem, password: fixedPassword });
        await admin.save();
      }
    }

    // Check if the email provided in the request is allowed
    if (!allowedEmails.includes(email)) {
      return res.status(400).json({ message: "Unauthorized email address." });
    }

    // Check if the provided password matches the fixed password
    if (password !== fixedPassword) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    // Find the admin in the database using the provided email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found. Please contact the system administrator." });
    }

    // Successfully logged in
    res.status(200).json({ message: "Login successful.", admin });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
