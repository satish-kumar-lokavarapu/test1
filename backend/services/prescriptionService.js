// importing the prescription model
const Prescription = require("../models/prescription");


const search = (query)=>{
    const params = {...query}
    return Prescription.find(params);
}
const searchOne = (query)=>{
const params = {...query}
return Prescription.findOne(params);
}
// creating the new prescription
const save = (payload)=>{
    const newPrescription = new Prescription(payload);
      return newPrescription.save();
}

module.exports = { search, searchOne, save}