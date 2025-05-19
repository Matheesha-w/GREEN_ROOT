const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  cropId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CropModel', 
    required: true 
  },
  name: { type: String, required: true }, 
  price: { type: Number, required: true }, // Price per unit
  subtotal: { type: Number, required: true }, // price * 1 (since quantity is 1)
  image: { type: String, required: true }, 
});

const cartSchema = new mongoose.Schema({
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [cartItemSchema], // Array of items in the cart
  totalPrice: { 
    type: Number, 
    required: true, 
    default: 0 
  }, // Sum of all subtotals
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Cart = mongoose.model("cartModel", cartSchema);
module.exports = Cart;
