const FieldModel = require('../../farmer/model/fieldModel'); // Adjust path based on your project

// @desc    Get one field by farmerID
// @route   GET /api/fields?farmerID=xxx
// @access  Public or Protected (your choice)
const getFieldByFarmerID = async (req, res) => {
  try {
    const { farmerID } = req.params;

    console.log(farmerID)
    let field;

    if (farmerID) {
      // Find ONE field belonging to the farmer
      field = await FieldModel.findOne({ farmerID: farmerID });
      console.log(field)
    } else {
      
      throw error('farmer id is needed')
    }

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    res.json(field);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getFieldByFarmerID,
};
