const jwt = require('jsonwebtoken');

const UserAuth = async (req, res, next) => {
    const { token } = req.cookies;
    console.log("Auth middleware called !\n");
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized to access this route. Please log in again."
        });
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecoded?.id) {
            req.user = { id: tokenDecoded.id };
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again."
            });
        }
        console.log("Auth middleware called Executed succcess and calling next function\n\n");
        next();
    } catch (error) {
        console.log("Error in userAuth middleware:", error);
        // console.log("Auth middleware called Executed succcess and calling next function\n !\n");
        return res.status(500).json({
            success: false,
            message: `Internal Server Error. Authentication failed in middleware.\nError: ${error.message}`
        });
    }
};

module.exports = UserAuth;
