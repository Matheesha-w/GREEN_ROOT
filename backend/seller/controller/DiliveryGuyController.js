const BulkOrder = require('../model/bulkOrderModel'); // Adjust the path as necessar
const NormalOrder = require('../../customer/model/orderModel'); // Adjust the path as necessary
const User = require("../../admin/model/userModel");
const { sendOrderUpdateEmail } = require('./emailSender');

// Controller to get orders filtered by status 'accepted'
const getAcceptedOrders = async (req, res) => {
  try {
    const acceptedOrders = await BulkOrder.find({ status: { $ne: 'Declined' } });

      //.populate('sellerId', 'name email')   // optional: populate seller details
      //.populate('farmerId', 'name email');  // optional: populate farmer details

    res.status(200).json(acceptedOrders);
  } catch (error) {
    console.error('Error fetching accepted orders:', error);
    res.status(500).json({ message: 'Server error while fetching accepted orders' });
  }
};


const getAcceptedNormalOrders = async (req, res) => {
  try {
    const acceptedOrders = await NormalOrder.find({ status: 'accepted' })
      //.populate('sellerId', 'name email')   // optional: populate seller details
      //.populate('farmerId', 'name email');  // optional: populate farmer details

    res.status(200).json(acceptedOrders);
  } catch (error) {
    console.error('Error fetching accepted orders:', error);
    res.status(500).json({ message: 'Server error while fetching accepted orders' });
  }
};


const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
  
    // Validate inputs
    if (!orderId || !status) {
      return res.status(400).json({ message: 'Order ID and status are required.' });
    }

   const order = await BulkOrder.findOne({ _id: orderId});
   console.log(order)
    const userId = order.sellerId;

    const user = await User.findById(userId);
    console.log(user.email)
    await sendOrderUpdateEmail(user.email,orderId,`Dear customer, your order (Order ID: ${orderId}) has been ${status.toLowerCase()}. Thank you for choosing GreenRoots. We’ll notify you with further updates soon.`)

    try {
      const updatedOrder = await BulkOrder.findByIdAndUpdate(
        orderId,
        { status },
        { new: true } // return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found.' });
      }

      //const user = await User.findById(userId);
  
      res.status(200).json({
        message: 'Order status updated successfully.',
        order: updatedOrder,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Server error while updating order status.' });
    }
  };

  const updateNomalOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
  
    // Validate inputs
    if (!orderId || !status) {
      return res.status(400).json({ message: 'Order ID and status are required.' });
    }

   const order = await NormalOrder.findOne({ _id: orderId});
   console.log(order)
    const userId = order.ordinary_buyer_id;

    const user = await User.findById(userId);
    console.log(user.email)
    await sendOrderUpdateEmail(user.email,orderId,`Dear customer, your order (Order ID: ${orderId}) has been ${status.toLowerCase()}. Thank you for choosing GreenRoots. We’ll notify you with further updates soon.`)

    try {
      const updatedOrder = await NormalOrder.findByIdAndUpdate(
        orderId,
        { status },
        { new: true } // return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found.' });
      }

      //const user = await User.findById(userId);
  
      res.status(200).json({
        message: 'Order status updated successfully.',
        order: updatedOrder,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Server error while updating order status.' });
    }
  };

module.exports = { getAcceptedOrders ,updateOrderStatus,getAcceptedNormalOrders,updateNomalOrderStatus};
