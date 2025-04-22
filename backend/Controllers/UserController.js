const UserModel = require('../models/User.js');

exports.getUserData = async (req , res)=>{
    const userId = req.user?.id;
    try{
         
        const user = await UserModel.findById(userId);

        if(!user){
            console.log("User doesn't exist");

            return res.status(500).json({
                success : false ,
                message:"User doesn't exist"
            })
        }

        return res.status(200).json({
            success: true,
            userData :{
                name : user.name ,
                isAccountVerified : user.isAccountVerified 
            }
        })

    }
    catch(error){
         console.log("Error in user Controller");

         return res.status(500).json({
            success : false ,
            message : error.message 
         })
    }
}
