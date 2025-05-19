const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newsSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
     user_id: {
         type: String,
         required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('News', newsSchema)