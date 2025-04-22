const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({

    name :{
        type : String,
        required : true
    },
    email : {
        type :String ,
        required : true,
        unique : true
    },
    password :{
        type : String ,
        required : true
    },
    verifyOtp : {
        type : String ,
        default :''
    },
    verifyOtpExpireAt :{
        type : Number ,
        default : 0
    },
    isAccountVerified :{
        type : Boolean ,
        default : false
    },
    resetOtp:{
        type : String ,
        default : ''
    },
    resetOtpExpireAt:{
        type : Number ,
        default : 0
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
{timestamps : true})

const UserModel=mongoose.model('User',UserSchema);

module.exports=UserModel;
