const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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
      required: false,
    },

    image: {
      type: String,
      default: "https://demofree.sirv.com/nope-not-here.jpg",
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    supplier:{
        type:String,
        required:true,
    },
    sellerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    price:{
      type:Number,
      required:true,
  },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("productModel", productSchema);

module.exports = product;
