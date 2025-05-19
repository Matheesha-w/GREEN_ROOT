const express = require("express");
const router = express.Router();
const SearchModel = require("../model/SearchModel");
const { default: mongoose } = require('mongoose');

// Get all feedbacks
router.get('/', async (req, res) => {
  try {
    const allSearch = await SearchModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(allSearch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get feedback by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const singleSearch = await SearchModel.findById(id);

    if (!singleSearch) {
      return res.status(404).json({ error: 'No such SearchModel' });
    }

    res.status(200).json(singleSearch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create new SearchModel
router.post('/', async (req, res) => {
  const { search_name } = req.body;

  try {
    const newSearch = await SearchModel.create({
      search_name
    });

    res.status(201).json(newSearch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// DELETE all searches
router.delete('/', async (req, res) => {
  try {
    await SearchModel.deleteMany({});
    res.status(200).json({ message: "All searches deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
