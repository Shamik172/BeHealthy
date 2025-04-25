const express = require('express');
const { getAllMusic, addMusic } = require('../Controllers/MusicController.js');
const MusicRoutes = express.Router();

MusicRoutes.get('/get-all', getAllMusic);

MusicRoutes.post('/add-music' , addMusic );

module.exports = MusicRoutes;