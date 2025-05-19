const express = require("express");
const router = express.Router();
const order = require("../model/orderModel");
const { default: mongoose } = require('mongoose');

//Get all orders
router.get('/',async(req, res) => {
  try{
  const allorders = await order.find({}).sort({createdAt: -1});

  res.status(200).json(allorders);
  } catch (error) {
      res.status(400).json({error: error.message});
  }
});


//Get order by ID/get single order
router.get('/:id',async(req, res) => {

  try{
  const { id } = req.params;

  const singleorder = await order.findById(id);

  if(!singleorder) {
      return res.status(404).json({error:'No such product'});
  }
  res.status(200).json(singleorder);
} catch (error) {
  res.status(400).json({error: error.message});
}
});


// Create a new order
router.post('/', async (req, res) => {
  const { totalPrice, cartItems, delivery, tax, finalTotal,ordinary_buyer_id } = req.body;

  try {

      const orderCount = await order.countDocuments();

    const newOrder = await order.create({
      totalPrice,
      cartItems,
      delivery,
      tax,
      finalTotal,
      ordinary_buyer_id,


      orderNumber: orderCount + 1, // Generate sequential order number
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such order' });
    }

    const singleorder = await order.findOneAndDelete({ _id: id }); // Corrected line

    if (!singleorder) {
      return res.status(404).json({ error: 'No such order' });
    }
    res.status(200).json(singleorder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//update an order-no need 


module.exports = router;
