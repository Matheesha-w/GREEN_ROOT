const express = require('express');
const router = express.Router();
const { getFieldByFarmerID } = require('../controller/sellerFarmersMap'); // Adjust path

// GET one field by farmerID
router.get('/:farmerID', getFieldByFarmerID);

module.exports = router;
