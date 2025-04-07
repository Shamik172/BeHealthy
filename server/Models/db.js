const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URI;

const PORT = process.env.PORT || 8080;

mongoose.connect(mongo_url)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB", err);
    })
    
