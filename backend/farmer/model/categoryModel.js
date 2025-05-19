const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "https://demofree.sirv.com/nope-not-here.jpg",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const category = mongoose.model("categoryModel", categorySchema);

module.exports = category;
