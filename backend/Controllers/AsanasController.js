const fs = require('fs');
const path = require('path');
const AsanasModel = require('../Models/Asanas.js');

const getAsanasByBodyPart = async (req, res) => {
  console.log("Fetching asanas by body part...");
  
  try {
    // Clear all existing asanas
    await AsanasModel.deleteMany({});

    // Read asanas data from JSON file
    const filePath = path.join(__dirname, 'asanasData.json'); // Replace with the correct path to your JSON file
    const rawData = fs.readFileSync(filePath);
    const asanasData = JSON.parse(rawData);

    // Insert asanas from JSON into the database
    await AsanasModel.insertMany(asanasData);

    // Fetch asanas based on the bodyPart query
    const { bodyPart } = req.query;
    let asanas;

    if (bodyPart) {
      asanas = await AsanasModel.find({ bodyParts: bodyPart });
    } else {
      asanas = await AsanasModel.find();
    }

    // Send the fetched asanas to the frontend
    res.status(200).json(asanas);
    
  } catch (error) {
    console.error('Error fetching and updating asanas:', error);
    res.status(500).json({ message: 'Failed to fetch and update asanas', error: error.message });
  }
};



const getTodaysAsana = async (req, res) => {
  try {
    // Fetch the first asana (or modify criteria as needed)
    const todaysAsana = await AsanasModel.findOne(); // You can customize this query further based on your needs

    if (!todaysAsana) {
      return res.status(404).json({ message: 'No asana found for today.' });
    }

    res.status(200).json(todaysAsana);
  } catch (error) {
    console.error('Error fetching today\'s asana:', error);
    res.status(500).json({ message: 'Failed to fetch today\'s asana', error: error.message });
  }
};
module.exports = {
  getAsanasByBodyPart,
  getTodaysAsana
};

// // Example route in routes/asanaRoutes.js or similar
// router.get('/by-body-part', async (req, res) => {
//     const bodyPart = req.query.bodyPart; 
//     try {
//         const query = bodyPart ? { bodyPart } : {};

//         asanas = await AsanasModel.find({ bodyParts: bodyPart });
//         res.json(asanas);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });