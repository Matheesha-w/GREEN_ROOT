const express = require("express");
const router = express.Router();
const { placeOrder,getOrders,getOrderById,deleteOrder} = require("../controller/bulkOrderController"); // Import the controller function


// Route to place a bulk order
router.post("/placeOrder", placeOrder);
router.get("/getOrders/:sellerID", getOrders);  // This will handle POST requests to place bulk orders
router.get("/getOrder/:orderID", getOrderById);
router.delete("/delOrder/:orderId", deleteOrder);

module.exports = router;
deleteOrder