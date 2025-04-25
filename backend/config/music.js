// const fs = require('fs');
// const mongoose = require('mongoose');
// const Music = require('../Models/MusicSchema.js');

// // Function to load music data from music.json and insert into MongoDB
// const loadMusicData = async () => {
//   try {
//     // Read the music.json file
//     const musicData = JSON.parse(fs.readFileSync('./musicData.json', 'utf8'));

//     // Check if there is data
//     if (Array.isArray(musicData)) {
//       // Insert the music data into MongoDB
//       await Music.insertMany(musicData);
//       console.log('Music data successfully added to MongoDB');
//     } else {
//       console.log('Music data format is invalid. Ensure it is an array.');
//     }
//   } catch (error) {
//     console.error('Error loading music data into MongoDB:', error);
//   }
// };

// // Call the function to add data
// module.exports =loadMusicData;
