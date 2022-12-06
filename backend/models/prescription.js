// Model for Prescription Schema
// importing the Mongoose
const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  appointmentId: {
    type: String,
    required: true,
  },
  appointmentInfo: {
    type: Object,
    required: true,
  },
  Symptoms: {
    type: String,
    required: true,
  },
  Tests: {
    type: String,
    required: true,
  },
  Medicines: {
    type: String,
    required: true,
  },
  Remarks: {
    type: String,
    required: true,
  },
});

const prescriptionModel = mongoose.model("Prescription", PrescriptionSchema);
module.exports = prescriptionModel;

