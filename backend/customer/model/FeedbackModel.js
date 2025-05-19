const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
  {
    feedback: {
      type: String,
      required: true,
      trim: true
    },
    hasIssue: {
      type: String,
      enum: ['yes', 'no'],
      required: true
    },
    complaintType: {
      type: String,
      enum: ['delay', 'quality', 'damaged', 'wrong', 'other', ''],
      default: ''
    },
    ratings: {
      type: Map,
      of: Number, // rating 1-5
      default: {}
    },
    orderId: {
      type: String, 
    },
    role: {
    type: String,
    default: ''  //  'customer' is stored by default
  },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;
