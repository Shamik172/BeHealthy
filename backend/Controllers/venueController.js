const venueModel = require('../Models/venueSchema');
const mongoose = require('mongoose');
const User = require('../Models/User')
const Venue = require('../Models/venueSchema')

// Function to save the user's location

exports.saveUserLocation = async (req, res) => {
    try {
        const {location} = req.body;
        console.log(location.lat, location.lng);

        const isVenueAlreadyExists = await venueModel.findOne({
            // 'location.coordinates': [location.lng, location.lat],
            'location.coordinates.0': location.lng,
            'location.coordinates.1': location.lat,
            // slot,
          });
          
        // console.log(isVenueAlreadyExists);
        if (isVenueAlreadyExists) {
            // isVenueAlreadyExists.slotCounts[slot] += 1;
            await isVenueAlreadyExists.save();
            // return res.status(400).json({ message: 'Location already exists', success: false });
            return res.status(200).json({ 
              message: 'Venue updated with new user',
              success: true,
              venue: isVenueAlreadyExists, // return the updated venue to confirm userId during getting from venueStat
            });
        }

        const newVenue = new venueModel({
            location: {
              type: 'Point',
              coordinates: [location.lng, location.lat],
              name: location.raw.display_name,
              distance: location.distanceToVenue,
            },
          });

          const userId = req.user.id;
          // console.log(userId);
          const user = await User.findById(userId);
          // console.log(user);
          user.venue.push(newVenue._id);
          await user.save();
        // console.log(newVenue);
        // Save the venue to the database
        await newVenue.save();
        res.status(201).json({ 
          message: 'Venue saved successfully', 
          success: true,
          venue: newVenue, // return the saved venue to confirm userId during getting from venueStat
         });
    } catch (error) {
        console.error('Error saving location:', error);
        res.status(500).json({ error: 'Internal Server Error', success: false });
    }
}


exports.fetchAllVenue = async (req, res) => {
    try {
      const { lat, lng } = req.query;
      console.log("Received lat:", lat, "lng:", lng);

      console.log(req.user)
      const user = await User.findById(req.user.id); // await is needed here
      if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
      }
      console.log(user)
      const venueIds = user.venue; // this is an array of ObjectIds
      console.log(venueIds)
      const venues = await Venue.find({ _id: { $in: venueIds } }); // fetch all venues whose _id is inside venueIds array
      console.log(venues);

      res.status(200).json({ 
        message: "User venues fetched successfully", 
        success: true,
        data: venues 
      });

  
    //   if (!venues || venues.length === 0) {
    //     return res.status(404).json({ message: "No venues found", success: false });
    //   }
    } catch (error) {
      console.error("FetchAllVenue Error:", error); // this logs actual error
      res.status(500).json({ error: error.message, success: false });
    }
  }; 
  
  
  
