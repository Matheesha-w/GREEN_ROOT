const express = require('express');
const router = express.Router();
const { createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCategory} = require('../controller/productController');

// Create a new product
router.post('/product', createProduct);

// Get all products
router.get('/products/:sid', getAllProducts);
router.get('/products/:sid/:cid', getProductByCategory);

// Get a product by ID
router.get('/product/:id', getProductById);

// Update a product by ID
router.put('/product/:id', updateProduct);

// Delete a product by ID
router.delete('/product/:id', deleteProduct);

module.exports = router;
