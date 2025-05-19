const Order = require("../../customer/model/orderModel");
const User = require("../../admin/model/userModel");  // Your Order model
const {sendOrderUpdateEmail} = require("./emailSender");




// Function to fetch orders (with optional status filter)
const fetchOrders = async (req, res) => {
    const {sid} = req.params;
    try {
        const { status } = req.query; // Get status filter from request query

        let orders;
        if (status) {
            orders = await Order.find({ status }).sort({ createdAt: -1 }); // Fetch filtered orders by status
        } else {
            orders = await Order.find().sort({ createdAt: -1 }); // Fetch all orders sorted by latest
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};


const updateOrderStatus = async (req, res) => {
    try {
        const { orderID, status } = req.body;
        console.log('update is called')

        // Find the order and update status
        const order = await Order.findOneAndUpdate(
            { _id: orderID },
            { status: status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        console.log(order)

        // Fetch the user's email (assuming you have an ordinary_buyer_id reference)
        const user = await User.findById(order.ordinary_buyer_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send email notification
        await sendOrderUpdateEmail(user.email,orderID, `Your order has been ${status} by the seller,Well keep you updated on the progress, and youll receive a notification once your order is ready to move forward.`);

        res.status(200).json({ message: "Order status updated and email sent successfully" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { fetchOrders,updateOrderStatus};
