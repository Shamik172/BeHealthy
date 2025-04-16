// controllers/locationController.js
const Location = require('../Models/Location');

const saveUserLocation = async (req, res) => {
  const { userId, lat, lng, name } = req.body;
  try {
    const location = new Location({ userId, lat, lng, name });
    await location.save();
    res.status(201).json({ message: 'Location saved' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving location' });
  }
};

const getLocationCounts = async (req, res) => {
  try {
    const counts = await Location.aggregate([
      { $group: { _id: { lat: '$lat', lng: '$lng', name: '$name' }, users: { $sum: 1 } } },
    ]);
    res.json(counts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch counts' });
  }
};

module.exports = {
  saveUserLocation,
  getLocationCounts,
};
