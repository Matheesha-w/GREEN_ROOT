const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const postsSchema = new Schema ({


    title: {
        type: String,
        required: true
    },
    binominalName: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    sunRequirement: {
        type: String,
        required: true
    },
    soilRequirements: {
        type: String,
        required: true
    },
    sowingMethod: {
        type: String
    },
    wateringNeeds: {
        type: String,
        required: true
    },
    spread: {
        type: String
    },
    rowSpacing: {
        type: String
    },
    height: {
        type: String
    },
    file: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('GrowingGuide', postsSchema)