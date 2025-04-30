const YogaInstructor = require('../Models/YogaInstructor.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log("details : " , email , password);
    // Check if email or password is missing
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    try {
        // Find the instructor by email
        const instructor = await YogaInstructor.findOne({ email });
        // console.log("Instructor Found");
        // If instructor does not exist
        if (!instructor) {
            return res.status(400).json({
                success: false,
                message: "Instructor doesn't exist"
            });
        } 
        // console.log("Instructor data " , instructor);
       
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, instructor.password);
        // console.log("Wrong Password");
        // If password does not match
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: instructor._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Set token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            success: true,
            message: "Instructor logged in successfully"
        });

    } catch (error) {
        console.log("Error in login controller:", error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error, Login Failed \nError:->${error.message}`
        });
    }
};

const logout = async (req, res) => {
    try {
        // Clear the JWT token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.status(200).json({
            success: true,
            message: "Instructor logged out successfully"
        });
    } catch (error) {
        console.log("Error in logout controller:", error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error, Logout Failed \nError:->${error.message}`
        });
    }
};

const registerInstructor = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Data Received to create new Instructor : ", { name, email, password });

    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    try {
        // Check if the instructor already exists
        const existingInstructor = await YogaInstructor.findOne({ email });
        if (existingInstructor) {
            return res.status(400).json({
                success: false,
                message: "Instructor already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new instructor in the database
        const instructor = await YogaInstructor.create({
            name,
            email,
            password: hashedPassword
        });

        // Save the new instructor
        await instructor.save();
        console.log("Instructor Created and Saved");

        // Create a JWT token
        const token = jwt.sign(
            { id: instructor._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Set the JWT token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Send a welcome email to the instructor
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Our Yoga Platform',
            text: `Hello ${name},\n\nWelcome to our yoga platform! We're excited to have you as an instructor.\n\nBest regards,\nThe Team`
        };

        // Ensure the transporter is ready before sending the email
        transporter.verify((error, success) => {
            if (error) {
                console.error('SMTP config is invalid:', error);
            } else {
                console.log('SMTP server is ready to send emails!');
            }
        });

        // Send the welcome email
        console.log("Reached till mail send option");
        await transporter.sendMail(mailOptions);
        console.log("Welcome mail sent successfully to the new instructor: ", name, "  ", email);

        // Send success response
        return res.status(201).json({
            success: true,
            message: "Instructor Created Successfully"
        });

    } catch (error) {
        console.log("Error in registerInstructor controller: ", error);

        // Return error response in case of failure
        return res.status(500).json({
            success: false,
            message: `Internal Server Error, Registration Failed \nError:->${error.message}`
        });
    }
};

// Create a new instructor
const createInstructor = async (req, res) => {
  try {
    const newInstructor = new YogaInstructor(req.body);
    const savedInstructor = await newInstructor.save();
    res.status(201).json(savedInstructor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Instructor Authentication Controller
const isInstructorAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Instructor is authenticated",
        });
    } catch (error) {
        console.log("Error in isInstructorAuthenticated controller: ", error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error, isInstructorAuthenticated Failed \nError:->${error.message}`,
        });
    }
};

const sendInstructorResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(500).json({
            success: false,
            message: "Email is required to reset password",
        });
    }

    try {
        const instructor = await YogaInstructor.findOne({ email });

        if (!instructor) {
            return res.status(500).json({
                success: false,
                message: 'Instructor not found',
            });
        }

        const otp = "123456"; // For simplicity, using a static OTP. You should generate one in production.
        instructor.resetOtp = otp;
        instructor.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        await instructor.save(); // Save OTP and expiry

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: instructor.email,
            subject: 'Reset Your Password',
            html: PASSWORD_RESET_TEMPLATE
                .replace("{{otp}}", otp)
                .replace("{{email}}", instructor.email),
        };

        console.log("Reached till nodemailer");
        transporter.verify((error, success) => {
            if (error) {
                console.error('SMTP config is invalid:', error);
            } else {
                console.log('SMTP server is ready to send emails!');
            }
        });

        await transporter.sendMail(mailOptions); // Send email

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent successfully",
        });
    } catch (error) {
        console.log('Error in sendInstructorResetOtp controller: ', error);

        return res.status(500).json({
            success: false,
            message: `Error in sendInstructorResetOtp controller: ${error}`,
        });
    }
};

const verifyInstructorResetPasswordOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            success: false,
            message: "Email and OTP are required",
        });
    }

    try {
        const instructor = await YogaInstructor.findOne({ email });

        if (!instructor) {
            return res.status(404).json({
                success: false,
                message: "Instructor does not exist",
            });
        }

        if (instructor.resetOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Wrong OTP",
            });
        }

        if (instructor.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }

        return res.status(200).json({
            success: true,
            message: "OTP verified for password reset",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in verifying OTP",
        });
    }
};

const resetInstructorPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(500).json({
            success: false,
            message: "All fields are required to reset password",
        });
    }

    try {
        const instructor = await YogaInstructor.findOne({ email });

        if (!instructor) {
            return res.status(400).json({
                success: false,
                message: "Instructor doesn't exist",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        instructor.password = hashedPassword;
        instructor.resetOtp = '';
        instructor.resetOtpExpireAt = 0;
        await instructor.save();

        return res.status(200).json({
            success: true,
            message: "Password reset success",
        });
    } catch (error) {
        console.log(`Error in resetInstructorPassword controller: ${error}`);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all instructors
const getAllInstructors = async (req, res) => {
  try {
    const instructors = await YogaInstructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single instructor by ID
const getInstructorById = async (req, res) => {
  try {
    const instructor = await YogaInstructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify an instructor
const verifyInstructor = async (req, res) => {
  try {
    const instructor = await YogaInstructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    instructor.isVerified = true;
    await instructor.save();
    res.json({ message: 'Instructor verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Feature or unfeature an instructor
const featureInstructor = async (req, res) => {
  try {
    const { featured } = req.body;
    const instructor = await YogaInstructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    instructor.featured = featured;
    await instructor.save();
    res.json({ message: `Instructor ${featured ? 'featured' : 'unfeatured'} successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update instructor availability
const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const instructor = await YogaInstructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    instructor.availability = availability;
    await instructor.save();
    res.json({ message: 'Availability updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rate an instructor
const rateInstructor = async (req, res) => {
  try {
    const { rating } = req.body;
    const instructor = await YogaInstructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    instructor.rating = rating;
    await instructor.save();
    res.json({ message: 'Instructor rated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top-rated instructors
const getTopRatedInstructors = async (req, res) => {
  try {
    const instructors = await YogaInstructor.find()
      .sort({ rating: -1 })
      .limit(5); // Top 5
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
    login,
    logout,
    registerInstructor,
    
    isInstructorAuthenticated,
    sendInstructorResetOtp,
    verifyInstructorResetPasswordOtp,
    resetInstructorPassword,
    
    createInstructor,
    getAllInstructors,
    getInstructorById,
    verifyInstructor,
    featureInstructor,
    updateAvailability,
    rateInstructor,
    getTopRatedInstructors
}