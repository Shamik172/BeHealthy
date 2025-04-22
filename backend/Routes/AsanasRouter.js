const express = require('express');

const router = express.Router();
const Asanas = require('../Models/Asanas');
// const auth = require('../Middlewares/Auth');
// const admin = require('../Middlewares/Admin');

const { getAsanasByBodyPart } = require('../Controllers/AsanasController.js');
const AsanasModel = require('../Models/Asanas');

// Get all asanas (public)
router.get('/', async (req, res) => {
    try {
        const asanas = await Asanas.find();
        res.json({ success: true, asanas });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching asanas' 
        });
    }
});

// Add new asana (open for now)
router.post('/', async (req, res) => {
    try {
        const newAsana = new Asanas(req.body);
        await newAsana.save();
        res.json({ 
            success: true, 
            message: 'Asana added successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error adding asana' 
        });
    }
});

// Update asana (open for now)
router.put('/:id', async (req, res) => {
    try {
        const updatedAsana = await Asanas.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedAsana) {
            return res.status(404).json({ success: false, message: 'Asana not found' });
        }
        res.json({ success: true, message: 'Asana updated successfully', asana: updatedAsana });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error updating asana' 
        });
    }
});

// Delete asana (open for now)
router.delete('/:id', async (req, res) => {
    try {
        await Asanas.findByIdAndDelete(req.params.id);
        res.json({ 
            success: true, 
            message: 'Asana deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting asana' 
        });
    }
});

// Example route in routes/asanaRoutes.js or similar
router.get('/by-body-part', async (req, res) => {
    const bodyPart = req.query.bodyPart; 
    try {
        let asanas;
        if (bodyPart) {
          asanas = await Asanas.find({ bodyParts: bodyPart });
        } else {
        
          asanas = await Asanas.find();
        }
        res.status(200).json(asanas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
 
router.get("/by-disease", async (req, res) => {
  try {
    const  {disease}  = req.query;
    const filter = disease
    ? { diseases: { $in: [new RegExp(disease, "i")] } } // for array matching
    : {};
    console.log(filter);

    const asanas = await Asanas.find(filter);
    res.status(200).json(asanas);
  } catch (err) {
    console.error("Error fetching asanas by disease:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/by-body-parts', getAsanasByBodyPart);

module.exports = router;