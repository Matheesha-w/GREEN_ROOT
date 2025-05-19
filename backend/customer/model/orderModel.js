const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    cartItems: [
      {
        name: String,
        image: String,
        quantity: Number,
        sellerId: String,
        totalPrice: Number, 
      },
    ],
    delivery: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    finalTotal: {
      type: Number,
    },
    orderNumber: {
      type: Number,
      unique: true, 
    },
    status: {
      type: String,
    },
    ordinary_buyer_id: {
      type: String,
      default: "0",
    },
  },
  {
    timestamps: true,
  }
);


orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      
      const lastOrder = await this.constructor.findOne().sort({ orderNumber: -1 });
      this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1; 
    } catch (err) {
      next(err); 
    }
  }
  next();
});

const order = mongoose.model('orderModel', orderSchema);

module.exports = order;
