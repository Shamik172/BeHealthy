const UserModel = require("../Models/User"); 
const bcrypt = require("bcrypt"); 
const jwt=require("jsonwebtoken");

exports.signup = async (req, res) => {
    // console.log("object signup");
    try {
        const { name, email, password } = req.body;
        
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists, go to login", success: false });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword, 
        });
        
        // Save user to database
        await newUser.save();
        
        res.status(201).json({ message: "Signup Success", success: true });
    } catch (error) {
        console.error("Signup Error:", error); 
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};


exports.login = async ( req, res) => {
    // console.log("object login");
    try {
        const {email, password } = req.body;
        // console.log("object");
        
        const existingUser = await UserModel.findOne({ email });
        const errorMsg = "User not found, please signup first";
        if (!existingUser) {
            return res.status(403).json({ message: errorMsg, success: false });
        }


        const isPswdEqual= await bcrypt.compare(password, existingUser.password);

        if (!isPswdEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }
        
        const jwtToken = jwt.sign(
            { email : existingUser.email , _id : existingUser._id},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        )

        res.status(200).json({ message: "Login Success!",
                               success: true  ,
                               email ,
                               name : existingUser.name,
                               jwtToken, 
                            });
        res.json({
            success: true,
            token: jwtToken,
            user: {
              id: existingUser._id,
              email: existingUser.email,
              role: existingUser.role  // Include role in response
            }
          });
    } catch (error) {
        console.error("Signup Error:", error); 
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
