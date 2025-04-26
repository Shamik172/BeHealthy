const VenueStats = require('../Models/venueStatsSchema');

exports.updateVenueStats = async (req, res) => {
  const { lat, lon, slot } = req.body;
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  const EPSILON = 0.000001; // tolerance for float comparison

  try {
    let venue = await VenueStats.findOne({
      'location.latitude': { $gte: latitude - EPSILON, $lte: latitude + EPSILON },
      'location.longitude': { $gte: longitude - EPSILON, $lte: longitude + EPSILON }
    });

    if (!venue) {
      // No venue exists => create new one
      venue = new VenueStats({
        location: { latitude, longitude },
        morningCount: slot === "morning" ? 1 : 0,
        eveningCount: slot === "evening" ? 1 : 0
      });
    } else {
      // Venue exists => increment slot count
      if (slot === "morning") venue.morningCount += 1;
      else if (slot === "evening") venue.eveningCount += 1;
    }

    await venue.save();

    return res.status(200).json({
      message: "Venue stats updated successfully",
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
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  const EPSILON = 0.000001;

  try {
    const venueStats = await VenueStats.findOne({
      'location.latitude': { $gte: latitude - EPSILON, $lte: latitude + EPSILON },
      'location.longitude': { $gte: longitude - EPSILON, $lte: longitude + EPSILON }
    });

    if (!venueStats) {
      return res.status(404).json({ message: "Venue stats not found at the given location" });
    }

    return res.status(200).json({
      venueId: `${latitude}-${longitude}`,
      morningCount: venueStats.morningCount || 0,
      eveningCount: venueStats.eveningCount || 0
    });
  } catch (error) {
    console.error("Error fetching venue stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


