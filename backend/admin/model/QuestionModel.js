const mongoose = require('mongoose');

const qestionsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    customTitle: {
        type: String,
        default: null,
    },
    message: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    editedAt: {
        type: Date,
    },
    replies: [{
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    isClosed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Question", qestionsSchema);