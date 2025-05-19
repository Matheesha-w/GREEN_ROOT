const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "completed", "canceled"],
      default: "upcoming",
      required: true,
    },

    dueDate: {
      type: String,
      default: "0/0/0",
      required: true,
    },

    farmerID: {
      type: String,
      default: "0",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const farmerSchedule = mongoose.model("farmerScheduleModel", scheduleSchema);

module.exports = farmerSchedule;
