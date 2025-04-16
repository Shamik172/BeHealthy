const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AsanasSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    bodyParts :{
        type : [String],
        required: true
    },
    difficulty:{
        type: String
    },
    duration : {
        type :String
    },
    benefits : {
        type : [String]
    },
    steps : {
        type :[String]
    },
    image :{
        type : String
    },
    video :{
        type : String
    }
}, {timestamps : true});

const AsanasModel =new  mongoose.model('Asanas', AsanasSchema);

module.exports = AsanasModel ;

