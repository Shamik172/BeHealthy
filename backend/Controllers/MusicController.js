const Music = require('../Models/MusicSchema.js');

exports.getAllMusic = async (req, res) => {
    try {
      // console.log("fetching music list");
      const musicList = await Music.find();
      // console.log("music list fetched : ", musicList);
      res.status(200).json({
        message: 'Music retrieved successfully',
        data: musicList
      });
    } catch (error) {
      console.error('Error fetching music:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


  // API to add new music to the database
exports.addMusic = async (req, res) => {
    try {
      const { name, artist, file, album, genre, duration } = req.body;
      const newMusic = new Music({
        name,
        artist,
        file,
        album,
        genre,
        duration,
      });
  
      await newMusic.save();
      res.status(201).json({ message: 'Music added successfully', data: newMusic });
    } catch (error) {
      console.error('Error adding music:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
