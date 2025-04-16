const ContactUsModel = require("../Models/ContactUs.js"); 

exports.contactUs= async (req, res) => {
    // console.log("object signup");
    try {
        const { name, email, msg } = req.body;

        const newMsg = new ContactUsModel({
            name,
            email,
            msg,
            // time ,
        });
        
        // Save user to database
        await newMsg.save();
        
        res.status(201).json({ message: "Message Send Success", 
                               success: true,
                               data: newMsg.createdAt // ⏰ Here's the timestamp
                            });
    } catch (error) {
        console.error("Message Send Error:", error); 
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};