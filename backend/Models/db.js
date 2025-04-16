const mongoose = require('mongoose');


const mongo_url = process.env.MONGO_URI;

const PORT = process.env.PORT || 8080;

// const fs =require('fs');
// const path=require('path');
// const AsanasModel = require('./Asanas');

// const asanasData = JSON.parse(
//     // fs.readFileSync(path.join('asanasData.json'))
//     fs.readFileSync(path.join(__dirname, './asanasData.json'), 'utf-8')

// );

mongoose.connect(mongo_url)
    .then(async ()=>{
        console.log("Connected to MongoDB");
        // await AsanasModel.deleteMany({});
        // await AsanasModel.insertMany(asanasData);

        // console.log("Asana Data Inserted Successfully");

    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB", err);
    })
    
