const venueModel = require('../Models/venueSchema');
const mongoose = require('mongoose');

// Function to save the user's location

exports.saveUserLocation = async (req, res) => {
    try {
        const {location, slot} = req.body;
        console.log(location.lat, location.lng, location.raw.display_name, location.distance, slot);
        // Create a new venue object
        // const isVenueAlreadyExists =  await venueModel.findOne({
        //     'location.lat': location.lat,
        //     'location.lng': location.lng,
        //     slot: slot
        // });
        const isVenueAlreadyExists = await venueModel.findOne({
            // 'location.coordinates': [location.lng, location.lat],
            'location.coordinates.0': location.lng,
            'location.coordinates.1': location.lat,
            // slot,
          });
          
        // console.log(isVenueAlreadyExists);
        if (isVenueAlreadyExists) {
            isVenueAlreadyExists.slotCounts[slot] += 1;
            await isVenueAlreadyExists.save();
            // return res.status(400).json({ message: 'Location already exists', success: false });
            return res.status(200).json({ 
              message: 'Venue updated with new user',
              success: true,
              venue: isVenueAlreadyExists, // return the updated venue to confirm userId during getting from venueStat
            });
        }
        // const newVenue = new venueModel({
        // location: {
            
        //     lat: location.lat,
        //     lng: location.lng,
        //     name: location.raw.display_name,
        //     distance: location.distanceToVenue,
        //     },
        // slot,
        // });
        const newVenue = new venueModel({
            location: {
              type: 'Point',
              coordinates: [location.lng, location.lat],
              name: location.raw.display_name,
              distance: location.distanceToVenue,
            },
            slotCounts: {
                Morning: slot === "Morning" ? 1 : 0,
                Evening: slot === "Evening" ? 1 : 0,
            },
          });
          
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
  
      const venues = await venueModel.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            $maxDistance: 10000,
          }
        }
      });
  
    //   if (!venues || venues.length === 0) {
    //     return res.status(404).json({ message: "No venues found", success: false });
    //   }

    if (!venues || venues.length === 0) {
        return res.status(200).json({ message: "No venues found", success: true, data: [] });
    }

    res.status(200).json({ message: "Venues fetched successfully", success: true, data: venues });
    } catch (error) {
      console.error("FetchAllVenue Error:", error); // this logs actual error
      res.status(500).json({ error: error.message, success: false });
    }
  }; 
  
  
  
