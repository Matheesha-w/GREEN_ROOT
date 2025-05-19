const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
      required: true,
    },

    image: {
      type: String,
      default: "https://demofree.sirv.com/nope-not-here.jpg",
      required: true,
    },

    farmerID: {
      type: String,
      default: "0",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const tickets = mongoose.model("ticketModel", ticketSchema);

module.exports = tickets;
