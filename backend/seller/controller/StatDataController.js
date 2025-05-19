const mongoose = require("mongoose");
const Order = require("../model/bulkOrderModel"); // Ensure the path is correct
const NormalOrder = require("../../customer/model/orderModel"); 
const Product = require("../model/productModel");

const getBulkOrderCount = async (req, res) => {
    try {
        const sellerID = req.params.sellerId;
        
        if (!sellerID) {
            return res.status(400).json({ message: "sellerID is required" });
        }

        const bulkOrderCount = await Order.countDocuments({ sellerId: sellerID }); // Ensure correct field name
        
        res.status(200).json({ count: bulkOrderCount });
    } catch (error) {
        console.error("Error fetching bulk order count:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getNormalOrderCount = async (req, res) => {
    try {
        const sellerID = req.params.sellerId;
        
        if (!sellerID) {
            return res.status(400).json({ message: "sellerID is required" });
        }

        const normalOrderCount = await NormalOrder.countDocuments({ sellerId: sellerID }); // Ensure correct field name
        
        res.status(200).json({ count: normalOrderCount });
    } catch (error) {
        console.error("Error fetching normal order count:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getProductCount = async (req, res) => {
    try {
        const sellerID = req.params.sellerId;
        
        if (!sellerID) {
            return res.status(400).json({ message: "sellerID is required" });
        }

        const productCount = await Product.countDocuments({ sellerId: sellerID }); // Ensure correct field name
        
        res.status(200).json({ count: productCount });
    } catch (error) {
        console.error("Error fetching product count:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getBulkOrderCount, getNormalOrderCount, getProductCount };
