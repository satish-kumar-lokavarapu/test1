// importing the doctor model
const Doctor = require("../models/doctModel");

// creating the new doctor/post method
const save = (doctor) => {
    const newdoctor = new Doctor(doctor);
    return newdoctor.save();
}
const search = (query)=>{
    const params = {...query}
    return Doctor.find(params);
}
// for get method obtaining the id to update
const searchOne = (query)=>{
    const params = {...query}
    return Doctor.findOne(params);
}

// for put method
const update = (id, payload)=>{
    return Doctor.findOneAndUpdate(
        id,
        payload
      );
}
const findAndUpdate = (id, payload)=>{
    return Doctor.findByIdAndUpdate(
        id,
        payload
      );
}

module.exports = { save, search, searchOne, update, findAndUpdate }