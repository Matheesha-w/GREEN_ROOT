const crops = require("../../farmer/model/cropModel")



const getAllcrops = async (re,res) =>{
    const Crops = await crops.find({}).sort({createdAt: -1})
    res.status(200).json(Crops)
}

// Get all crops, optionally filtered by crop category ID
const getCropsByCategory = async (req, res) => {
  try {
    // Retrieve cropCatId from request parameters
    const { cid } = req.params;

    if(cid == "All"){
      const Crops = await crops.find({}).sort({createdAt: -1})
      if (!Crops.length) {
        return res.status(404).json({ message: 'No crops found' });
      }
  
      res.status(200).json(Crops);
    }else{
      // If cropCatId is provided, filter crops by that cropCatId
        let filter = {};
        if (cid) {
          filter.categoryID = cid;
        }
        console.log(`fetching${cid}`)

        // Find crops based on filter criteria
        const Crops = await crops.find(filter).sort({createdAt: -1});
        if (!Crops.length) {
          return res.status(404).json({ message: 'No crops found' });
        }
    
        res.status(200).json(Crops);
    }

   
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports = {
  getCropsByCategory,
  getAllcrops
};
