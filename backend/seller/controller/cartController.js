const Cart = require('../model/cartModel');
const Crop = require('../../farmer/model/cropModel');

// Add crop to cart
const addToCart = async (req, res) => {
  try {
    const { cropId, sellerId } = req.body; // Just cropId, no quantity

    // Check if crop exists
    const crop = await Crop.findById(cropId);
    if (!crop) return res.status(404).json({ message: 'Crop not found' });

    // Check crop availability (crop quantity is checked here)
    if (crop.quantity <= 0) {
      return res.status(400).json({ message: 'Crop is out of stock' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ sellerId });
    if (!cart) {
      cart = new Cart({ sellerId, items: [] });
    }

    console.log(crop.image)

    // Check if the crop is already in the cart
    const existingItem = cart.items.find((item) => item.cropId.equals(cropId));
    if (existingItem) {
      return res.status(400).json({ message: 'Crop already in cart' });
    } else {
      cart.items.push({
        cropId,
        name: crop.name,
        price: crop.price,
        subtotal: crop.price, // Each crop added is considered 1 unit
        image: crop.image, // ✅ Add crop image
      });
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get cart using seller ID
// Get cart using seller ID
const getCart = async (req, res) => {
  try {
    const { sellerId } = req.params;

    let cart = await Cart.findOne({ sellerId })
      .populate({
        path: 'items.cropId',
        select: 'farmerID image', // Fetch only farmerID and image
      });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ sellerId, items: [], totalPrice: 0 });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { cropId, sellerId } = req.params;

    // Find the cart
    const cart = await Cart.findOne({ sellerId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Remove the item from the cart
    cart.items = cart.items.filter((item) => !item.cropId.equals(cropId));
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const cart = await Cart.findOne({ sellerId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
};
