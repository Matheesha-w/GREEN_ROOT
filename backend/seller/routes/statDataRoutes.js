const express = require("express");
const { getBulkOrderCount, getNormalOrderCount, getProductCount } = require("../controller/StatDataController"); // Ensure correct path

const router = express.Router();

// Route to get bulk order count
router.get("/bulk-order-count/:sellerId", getBulkOrderCount);

// Route to get normal order count
router.get("/normal-order-count/:sellerId", getNormalOrderCount);

// Route to get product count
router.get("/product-count/:sellerId", getProductCount);

module.exports = router;
