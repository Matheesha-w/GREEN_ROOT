const express = require('express');
const router = express.Router();
const { getFarmers ,getFarmerToDoList } = require('../controller/farmerToDolistControlller'); // Adjust the path as needed

// Route to get all farmers
router.get('/', getFarmers);
router.get("/todolist/:farmerID/", getFarmerToDoList);




module.exports = router;