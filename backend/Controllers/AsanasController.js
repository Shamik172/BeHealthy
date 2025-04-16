
const AsanasModel = require('../Models/Asanas');

const getAsanasByBodyPart = async (req, res) => {
    console.log("Fetching asanas by body part...");
  try {
    const { bodyPart } = req.query;
    let asanas;

    if (bodyPart) {
      asanas = await AsanasModel.find({ bodyParts: bodyPart });
    } else {
    
      asanas = await AsanasModel.find();
    }
    res.status(200).json(asanas);
  } catch (error) {
    console.error('Error fetching asanas:', error);
    res.status(500).json({ message: 'Failed to fetch asanas', error: error.message });
  }
  
};

module.exports = {
  getAsanasByBodyPart
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