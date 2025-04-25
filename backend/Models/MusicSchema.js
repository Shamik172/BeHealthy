const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  title: {
    type: String,
    default :"Music"
  },
  url: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    default :""
  },
  album: {
    type: String,
    default :""
  },
  genre: {
    type: String,
    default :""
  },
  duration: {
    type: Number, 
    default :0
  }
});

const Music = mongoose.model('Music', MusicSchema);

module.exports = Music;
