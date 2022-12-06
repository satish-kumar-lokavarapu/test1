// importing the appointment model
const Appointment = require("../models/appointModel");

// creating the new appointment
const save = (payload)=>{
    const newAppointment = new Appointment(payload);
    return newAppointment.save();
}

const search = (query)=>{
    const params = {...query}
    return Appointment.find(params);
}

// getting the id of the updating entry
const findAndUpdate = (id, payload)=>{
    return Appointment.findByIdAndUpdate(id, payload);
}



module.exports = { save, search, findAndUpdate}