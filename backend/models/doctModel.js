// Model for Doctor Schema
// importing the Mongoose
const mongoose = require("mongoose");

const doctSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    rating:{
      type: Number,
      default: 0
    },
    numOfReviews:{
      type: Number,
      default: 0
    },
    address: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    feePerCunsultation: {
      type: Number,
      required: true,
    },
    timings : {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    }

  },
  {
    timestamps: true,
  }
);

const doctModel = mongoose.model("doctors", doctSchema);
module.exports = doctModel;
