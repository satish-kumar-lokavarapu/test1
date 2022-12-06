// Model for Appointmet Schema
// importing the Mongoose
const mongoose = require("mongoose");

const appointSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorInfo: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    rating: {
      type: String,
      default:"0",
    },
    review: {
      type: String,
      default:"0",
    },
  },
  {
    timestamps: true,
  }
);

const appointModel = mongoose.model("appointment", appointSchema);
module.exports = appointModel;
