const mongoose = require('mongoose')

const Schema = mongoose.Schema

const solutionSchema = new Schema ({

    ticketID: {
        type: String, // Reference to the ticket
        required: true,
      },
    //   researcherID: {
    //     type: String, // ID of the researcher providing the solution
    //     required: true,
    //   },
      description: {
        type: String, // The solution provided by the researcher
        required: true,
      },
      file: {
        type: String, // Optional image for the solution
      }
    },
 { timestamps: true})

 module.exports = mongoose.model("Solution", solutionSchema)