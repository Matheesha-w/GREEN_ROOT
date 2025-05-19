const express = require("express");
const router = express.Router();
const Feedback = require("../model/FeedbackModel"); 
const { default: mongoose } = require('mongoose');

// Get all feedbacks
router.get('/', async (req, res) => {
  try {
    const allFeedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    res.status(200).json(allFeedbacks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get feedback by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const singleFeedback = await Feedback.findById(id);

    if (!singleFeedback) {
      return res.status(404).json({ error: 'No such feedback' });
    }

    res.status(200).json(singleFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create new feedback
router.post('/', async (req, res) => {
  const { feedback, hasIssue, complaintType, ratings, orderId } = req.body;

  try {
    const newFeedback = await Feedback.create({
      feedback,
      hasIssue,
      complaintType,
      ratings,
      orderId,
    });

    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
