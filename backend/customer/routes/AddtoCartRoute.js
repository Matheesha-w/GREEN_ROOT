const express = require('express');
const router = express.Router();
const AddtoCart = require('../model/AddtoCartModel');
const { default: mongoose } = require('mongoose');

//Get all orders
router.get('/',async(req, res) => {
    try{
    const allAddtoCarts = await AddtoCart.find({}).sort({createdAt: -1});

    res.status(200).json(allAddtoCarts);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


//Get order by ID/get single order
router.get('/:id',async(req, res) => {

    try{
    const { id } = req.params;

    const singleAddtoCart = await AddtoCart.findById(id);

    if(!singleAddtoCart) {
        return res.status(404).json({error:'No such product'});
    }
    res.status(200).json(singleAddtoCart);
} catch (error) {
    res.status(400).json({error: error.message});
}
});


//add items  to cart
router.post('/', async (req, res) => {
    const { name, quantity,image, price, totalPrice,ordinary_buyer_id,sellerId } = req.body;

    try {
        const newAddtoCart = await AddtoCart.create({
            name,
            quantity,
            image,
            price,
            totalPrice,
            ordinary_buyer_id,
            sellerId
        });

        res.status(201).json(newAddtoCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//Delete an order
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' });
      }
  
      const singleAddtoCart = await AddtoCart.findOneAndDelete({ _id: id }); // Corrected line
  
      if (!singleAddtoCart) {
        return res.status(404).json({ error: 'No such AddtoCart' });
      }
      res.status(200).json(singleAddtoCart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


//update cart quantity and total
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // Extract quantity from request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such product' });
    }

    // Fetch the existing cart item
    const cartItem = await AddtoCart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ error: 'No such AddtoCart' });
    }

    // Calculate new total price
    const newTotalPrice = quantity * cartItem.price;

    // Update the item in the database
    const updatedCart = await AddtoCart.findOneAndUpdate(
      { _id: id },
      { quantity: quantity, totalPrice: newTotalPrice }, // Update quantity and totalPrice
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});







// Get Cart Item Count
router.get('/cart/count', async (req, res) => {
  try {
    const count = await AddtoCart.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;