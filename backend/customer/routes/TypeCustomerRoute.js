const express = require("express");
const router = express.Router();
const TypeCustomer = require("../model/TypeCustomerModel");
const { default: mongoose } = require('mongoose');

// Get all feedbacks
router.get('/', async (req, res) => {
  try {
    const allTypeCustomers = await TypeCustomer.find({}).sort({ createdAt: -1 });
    res.status(200).json(allTypeCustomers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get feedback by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const singleTypeCustomer = await TypeCustomer.findById(id);

    if (!singleTypeCustomer) {
      return res.status(404).json({ error: 'No such TypeCustomer' });
    }

    res.status(200).json(singleTypeCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create new TypeCustomer
router.post('/', async (req, res) => {
  const { cus_type } = req.body;

  try {
    const newTypeCustomer = await TypeCustomer.create({
      cus_type
    });

    res.status(201).json(newTypeCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE all searches
router.delete('/', async (req, res) => {
  try {
    await TypeCustomer.deleteMany({});
    res.status(200).json({ message: "All types deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
