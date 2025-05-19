const Order = require("../model/bulkOrderModel"); // Import your Order model
const Cart = require("../model/cartModel");   // Import your Cart model
const Crop = require("../../farmer/model/cropModel");   // Import your Crop model
const User = require('../../admin/model/userModel')
const {clearCart} = require("./cartController")
const {sendOrderUpdateEmail} = require("./emailSender");

// Function to place an order
const placeOrder = async (req, res) => {
  const { userId, cartId, totalPrice, items } = req.body;

  try {
    // Log incoming data for debugging
    console.log('Request Body:', req.body);
    
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in the order.' });
    }

    const cropId = items[0].cropId;

    // Fetch the crop document to get the farmerId
    const crop = await Crop.findById(cropId);
    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    const farmerId = crop.farmerID;  // Get the farmerId from the crop document

    // Log seller and farmer information
    console.log('Seller ID:', userId);
    console.log('Farmer ID:', farmerId);
    console.log('crop ID:', cropId);

    // Create the bulk order in your database
    const newOrder = new Order({
      sellerId: userId,  // The seller of the items in the cart
      farmerId: farmerId,  // The farmer supplying the crops
      items: items.map(item => ({
        cropId: item.cropId,  // Store the full cropId
        name: item.name,
        price: item.price,
        subtotal: item.subtotal,
        image: item.image,
      })),
      totalPrice: totalPrice,
      paymentAmount: totalPrice, // Assuming the payment amount equals the total price
      paymentStatus: "Completed", // Assuming the payment is successful
      status: "pending", // Initial status
      createdAt: new Date(),
    });

    // Log the order to ensure it has the correct structure
    console.log('New Order:', newOrder);

    // Save the bulk order to the database
    await newOrder.save();
    console.log('Order saved successfully:', newOrder);

    // Clear the cart after placing the order
    //await Cart.deleteOne({ _id: cartId });

    // ✅ Call clearCart function manually
    const fakeReq = { params: { sellerId: userId } }; // Create a fake request object
    const fakeRes = {
      status: (code) => ({
        json: (data) => console.log(`Clear Cart Response: ${code}`, data),
      }),
    };
    await clearCart(fakeReq, fakeRes);

    const user = await User.findById(userId);
    console.log(user)

    await sendOrderUpdateEmail(user.email,newOrder._id, "Thank you for placing your order with us! Your request has been successfully submitted, and we are now waiting for the farmers to confirm availability.Well keep you updated on the progress, and youll receive a notification once your order is ready to move forward.");
    res.json({ success: true, orderId: newOrder._id });
    // Send email notification
    
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get orders based on different criteria (e.g., by seller or by customer)
const getOrders = async (req, res) => {
  const sellerID = req.params.sellerID;
  console.log(sellerID)
  try {
    if (!sellerID) {
      return res.status(400).json({ error: 'Seller ID is required.' });
    }

    // Fetch the bulk orders for the seller
    const orders = await Order.find({ sellerId: sellerID });
    console.log(orders)

    // If no orders found for the seller
    if (orders.length === 0) {
      return res.status(404).json({ error: 'No orders found for this seller.' });
    }

    // Return the list of orders
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
};



const getOrderById = async (req, res) => {
  const { orderID } = req.params;  // Extracting the orderID from the URL parameters
  console.log(orderID);

  try {
    // Validate that orderID is provided
    if (!orderID) {
      return res.status(400).json({ error: 'Order ID is required.' });
    }

    // Fetch the order with the given orderID
    const order = await Order.findById(orderID);

    // If no order found with the provided orderID
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    // Return the found order
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error fetching order:', error);

    // Handle specific error for invalid orderID format
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid Order ID format.' });
    }

    // General error handling for any other issues
    res.status(500).json({ error: 'An error occurred while fetching the order.' });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Check if the order exists
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    res.json({ success: true, message: 'Order deleted successfully.' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { placeOrder, getOrders ,getOrderById,deleteOrder};
