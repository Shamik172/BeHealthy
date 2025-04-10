const express = require('express');
const router = express.Router(); 
const AsanasModel = require('../Models/Asanas') ;

const { getAsanasByBodyPart} =require('../Controllers/AsanasController.js') ;


// // Example route in routes/asanaRoutes.js or similar
router.get('/by-body-part', async (req, res) => {
    const bodyPart = req.query.bodyPart; 
    try {
        const { bodyPart } = req.query;
        let asanas;
    
        if (bodyPart) {
          asanas = await AsanasModel.find({ bodyParts: bodyPart });
        } else {
        
          asanas = await AsanasModel.find();
        }
    
        res.status(200).json(asanas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/by-body-parts', getAsanasByBodyPart) ;

module.exports = router;
