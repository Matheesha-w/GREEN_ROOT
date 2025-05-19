const express = require('express');
const { fetchOrders,updateOrderStatus } = require('../controller/normalOrderCotroller');

const router = express.Router();

// Route to fetch all orders (with optional filtering)
router.get('/:sid', fetchOrders);
router.put("/updatestatus", updateOrderStatus);



module.exports = router;
