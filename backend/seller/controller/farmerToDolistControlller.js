const User = require('../../admin/model/userModel'); // Adjust the path as needed
const farmerSchedule = require("../../farmer/model/scheduleModel"); // Import the farmerSchedule model

// Fetch only farmers
const getFarmers = async (req, res) => {
    try {
        const farmers = await User.find({ role: 'farmer' });
        res.status(200).json(farmers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching farmers', error: error.message });
    }
};




// Controller function to get the to-do list filtered by farmerID
const getFarmerToDoList = async (req, res) => {
  const { farmerID } = req.params; // Get the farmerID from the request parameters

  try {
    // Find all schedules where the farmerID matches the provided farmerID
    const schedules = await farmerSchedule.find({ farmerID: farmerID });

    // If no schedules are found for this farmer, return a 404 response
    if (schedules.length === 0) {
      return res.status(404).json({ message: "No to-do list found for this farmer." });
    }

    // Send the found schedules as a JSON response
    res.status(200).json(schedules);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching to-do list:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { getFarmers, getFarmerToDoList, };
