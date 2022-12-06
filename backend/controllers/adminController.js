// Importing required dependencies
const User = require("../models/userModel");
const Doctor = require("../models/doctModel");

const userService = require('../services/userService');
const doctorService = require('../services/doctorService');
const appointmentService = require('../services/appointmentService');

// Function to retrive Doctor's list
const getAllDoctors = async (req, res) => {
    try {
      const doctors = await doctorService.search({})
      res.status(200).send({
      message: "Doctor list fetched successfully",
      success: true,
      data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor",
        success: false,
        error,
      });
    }
  };

 // Function to retrive User's list
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.search({});
      res.status(200).send({
        message: "Users list fetched successfully",
        success: true,
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor",
        success: false,
        error,
      });
    }
  };  

  // Function to change Doctor's Account status by Admin
  const changeDoctorAccountStatus = async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await doctorService.findAndUpdate(doctorId, {
        status,
      });
    const user = await userService.searchOne({ _id: doctor.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-doctor-request-changed",
        message: `Your doctor request has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isDoctor = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Doctor account status updated successfully",
        success: true,
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor",
        success: false,
        error,
      });
    }
  };

  module.exports = { getAllDoctors, getAllUsers, changeDoctorAccountStatus }