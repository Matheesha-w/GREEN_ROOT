const mongoose = require('mongoose');

const bulkOrderItemSchema = new mongoose.Schema({
  cropId: {  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'CropModel',  
    required: true,  
  },
  name: {  
    type: String,  
    required: true,  
  },
  price: {  
    type: Number,  
    required: true,  
  },
  subtotal: {  
    type: Number,  
    required: true,  
  },
  image: { type: String, required: true }, 
});

const bulkOrderSchema = new mongoose.Schema({
  sellerId: {  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',  
    required: true,  
  },
  farmerId: {  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',  
    required: true,  
  },
  items: [bulkOrderItemSchema], // Array of items in the bulk order
  totalPrice: {  
    type: Number,  
    required: true,  
    default: 0,  
  },
  status: {  
    type: String,  
    enum: ['accepted','Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],  
    default: 'Pending',  
  },
  createdAt: {  
    type: Date,  
    default: Date.now,  
  },
  // New fields for payment info
  paymentAmount: {  
    type: Number,  
    required: true,  
  },
  paymentStatus: {  
    type: String,  
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],  
    default: 'Pending',  
  }
});

const BulkOrder = mongoose.model('BulkOrder', bulkOrderSchema);

module.exports = BulkOrder;
