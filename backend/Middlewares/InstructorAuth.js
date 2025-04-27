const jwt = require('jsonwebtoken');
const YogaInstructor = require('../Models/YogaInstructor.js');  // Replace with actual user model

const InstructorAuth = async (req, res, next) => {
    const { token } = req.cookies;  // Getting the token from cookies
    console.log("Cookies Object:", req.cookies);  // Log the entire cookies object

    // If there is no token in cookies, return 401 unauthorized error
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized. User login required."
        });
    }

    try {
        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Log decoded token

        // Check if the decoded token has an id field
        if (!decoded?.id) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again."
            });
        }
        console.log("Token Decoded");

        // Check if the user with the given id exists in the database
        const user = await YogaInstructor.findById(decoded.id);
        
        if (!user) {
            console.log("Instructor not found");
            return res.status(403).json({
                success: false,
                message: "Access denied. User not found."
            });
        }
        console.log("Instructor Exist");

        // Attach user data to request for access in subsequent routes
        req.user = { id: user._id, username: user.username, email: user.email };  // You can add more user details if necessary

        // Proceed to the next middleware or route handler
        console.log("Calling Next function");
        next();
    } catch (error) {
        console.error("Error in InstructorAuth middleware:", error);

        // Handle any errors that occurred during the authentication process
        return res.status(500).json({
            success: false,
            message: `Internal Server Error. Authentication failed.\nError: ${error.message}`
        });
    }
};

module.exports = InstructorAuth;
