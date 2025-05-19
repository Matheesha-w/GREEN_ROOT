const express = require('express');
const router = express.Router();
const product = require('../../seller/model/productModel');

// Get all products
router.get('/', async (req, res) => {
    try {
        const allProducts = await product.find({}).populate('sellerId').sort({ createdAt: -1 }); //populate sellerId
        res.status(200).json({ products: allProducts }); //send products inside a object.
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;