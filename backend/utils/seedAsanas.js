require('dotenv').config();
const mongoose = require('mongoose');
const Asanas = require('../Models/Asanas');
const asanasData = require('../Models/asanasData.json');

const seedAsanas = async () => {
    try {
        console.log('Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected successfully!');

        console.log('Clearing existing asanas...');
        await Asanas.deleteMany({});
        console.log('Existing asanas cleared');

        console.log('Inserting new asanas...');
        await Asanas.insertMany(asanasData);
        console.log(`Successfully inserted ${asanasData.length} asanas`);

        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Connection error:', error.message);
        process.exit(1);
    }
};

seedAsanas();