const mongoose = require('mongoose');

const TypeCustomerSchema = new mongoose.Schema(
  {
    cus_type:{
        type: String,
        default: ""
    }
    ,createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

const Cus_Type = mongoose.model("TypeCustomerSchema", TypeCustomerSchema);

module.exports = Cus_Type;
