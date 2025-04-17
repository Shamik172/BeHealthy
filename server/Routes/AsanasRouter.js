const express = require('express');
const router = express.Router(); 
const AsanasModel = require('../Models/Asanas') ;

const { getAsanasByBodyPart} =require('../Controllers/AsanasController.js') ;


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

router.get("/by-disease", async (req, res) => {
  try {
    const { disease } = req.query;

    const filter = disease
      ? { diseases: { $in: [new RegExp(disease, "i")] } } // for array matching
      : {};

    const asanas = await AsanasModel.find(filter);
    res.status(200).json(asanas);
  } catch (err) {
    console.error("Error fetching asanas by disease:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// router.get('/by-body-parts', getAsanasByBodyPart) ;

module.exports = router;
