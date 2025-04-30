const Asana = require("../Models/Asanas.js");

// Helper to get the number of days since a fixed start date
const getDayIndex = (startDate, total) => {
  const today = new Date();
  const start = new Date(startDate);
  const diffTime = today.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % total;
};

const getDailyTask = async (req, res) => {
  try {
    const asanas = await Asana.find().sort({ createdAt: 1 }); // consistent order
    if (asanas.length === 0) {
      return res.status(404).json({ success: false, message: "No asanas available" });
    }

    const index = getDayIndex("2025-01-01", asanas.length); // Fixed rotation start
    const todayAsana = asanas[index];
    // console.log("Todays Asaan : " , todayAsana);
    res.status(200).json({ success: true, asana: todayAsana });
  } catch (err) {
    console.error("Error fetching daily task:", err);
    res.status(500).json({ success: false, message: "Failed to fetch daily task" });
  }
};



module.exports ={
    getDailyTask 
}