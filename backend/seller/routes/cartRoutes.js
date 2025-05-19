const express = require('express');
const router = express.Router();
const {addToCart,
    getCart,
    removeFromCart,
    clearCart,} = require('../controller/cartController');
//const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have a middleware for authentication

// Route to get the cart of the logged-in seller
router.get('/get/:sellerId', /*authMiddleware*/ getCart);

// Route to add a crop to the cart
router.post('/add', /*authMiddleware*/ addToCart);

// Route to remove an item from the cart
router.delete('/remove/:cropId/:sellerId', /*authMiddleware*/ removeFromCart);

// Route to clear the entire cart
router.delete('/clear/:sellerId', /*authMiddleware*/ clearCart);

module.exports = router;
