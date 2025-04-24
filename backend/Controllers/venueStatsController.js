const VenueStats = require('../Models/venueStatsSchema');

exports.updateVenueStats = async (req, res) => {
  const { lat, lon, slot } = req.body;

//   if (!lat || !lon || isNaN(lat) || isNaN(lon) || !["morning", "evening"].includes(slot)) {
//     return res.status(400).json({ message: "Invalid latitude, longitude, or slot" });
//   }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  try {
    let venue = await VenueStats.findOne({
      'location.latitude': latitude,
      'location.longitude': longitude
    });

    if (!venue) {
      // Create new venue
      venue = new VenueStats({
        location: { latitude, longitude },
        morningCount: slot === "morning" ? 1 : 0,
        eveningCount: slot === "evening" ? 1 : 0
      });
    } else {
      // Increment the appropriate count
      if (slot === "morning") venue.morningCount += 1;
      else venue.eveningCount += 1;
    }

    await venue.save();

    res.status(200).json({
      message: "Venue updated successfully",
      venueId: `${latitude}-${longitude}`,
      morningCount: venue.morningCount,
      eveningCount: venue.eveningCount
    });

  } catch (error) {
    console.error("Error updating venue stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// GET venue stats by exact lat-lon match
exports.getVenueStatsByLocation = async (req, res) => {
    const { lat, lon } = req.query;
  
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ message: "Invalid or missing latitude/longitude" });
    }
  
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
  
    try {
      const venueStats = await VenueStats.findOne({
        'location.latitude': latitude,
        'location.longitude': longitude
      });
  
      if (!venueStats) {
        return res.status(404).json({ message: "Venue stats not found at the given location" });
      }
  
      res.status(200).json({
        venueId: `${latitude}-${longitude}`,
        morningCount: venueStats.morningCount || 0,
        eveningCount: venueStats.eveningCount || 0
      });
    } catch (error) {
      console.error("Error fetching venue stats:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

// // POST or PUT to update venue stats (by exact location)
// exports.updateVenueStats = async (req, res) => {
//   const { lat, lon, morningCount, eveningCount } = req.body;

//   if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
//     return res.status(400).json({ message: "Invalid or missing latitude/longitude" });
//   }

//   try {
//     const coordinates = [parseFloat(lon), parseFloat(lat)];

//     let venueStats = await VenueStats.findOne({
//       "location.coordinates": coordinates
//     });

//     if (!venueStats) {
//       venueStats = new VenueStats({
//         location: {
//           type: "Point",
//           coordinates
//         },
//         morningCount: parseInt(morningCount || 0),
//         eveningCount: parseInt(eveningCount || 0)
//       });

//       await venueStats.save();
//     } else {
//       venueStats.morningCount += parseInt(morningCount || 0);
//       venueStats.eveningCount += parseInt(eveningCount || 0);
//       await venueStats.save();
//     }

//     res.status(200).json({
//     //   venueId: venueStats.id,
//     venueId: `${lat}-${lon}`,
//       morningCount: venueStats.morningCount,
//       eveningCount: venueStats.eveningCount
//     });

//   } catch (error) {
//     console.error("Error updating venue stats:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
