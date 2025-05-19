const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema(
  {
    xcordinate: {
      type: Number,
      required: true,
    },

    ycordinate: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
      default: "Unknown",
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

const fields = mongoose.model("FieldModel", fieldSchema);

module.exports = fields;
