const mongoose = require('mongoose');

const AddtoCartSchema = new mongoose.Schema(
    {
        name: {
              type: String,
              required: true,
            },
        
            quantity: {
              type: Number,
              required: true,
              default: 0,
            },
             
            image: {
              type: String,
              default: "https://demofree.sirv.com/nope-not-here.jpg",
              required: true,
            },

            price:{
              type:Number,
              required:true,
          },
          totalPrice: { 
            type: Number,
            required: true,
        },
        ordinary_buyer_id: {
          type: String,
          
          default: "0",
        },
    
        sellerId: {
          type: String,
          default: "0",
        },
    },
    {
        timestamps: true,
    }
);


const AddtoCart = mongoose.model("addtocarts", AddtoCartSchema); // matheesha updated

module.exports = AddtoCart;