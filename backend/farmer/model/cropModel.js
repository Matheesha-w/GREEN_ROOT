const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    fertilizer: {
      type: String,
      required: true,
      default: "None",
    },

    image: {
      type: String,
      default: "https://demofree.sirv.com/nope-not-here.jpg",
      required: true,
    },

    categoryID: {
      type: String,
      default: "0",
      required: true,
    },

    farmerID: {
      type: String,
      default: "0",
      required: true,
    },

    fieldID: {
      type: String,
      default: "0",
      required: true,
    },

    overview: {
      type: String,
      default: "None",
      required: false,
    },

    price: {
      type: Number,
      default: 0,
      required: true,
    },

    status: {
      type: String,
      default: "onfield",
      //enum: ["onfield", "offField"],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const crops = mongoose.model("CropModel", cropSchema);

module.exports = crops;
