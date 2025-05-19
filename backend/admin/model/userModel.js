const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'farmer', 'researcher', 'seller', 'customer', 'deliveryPerson']
    },
    image: {
        type: String,
        default: 'avatar.png'
    },
    status: {
        type: String,
        default: 'active'
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
