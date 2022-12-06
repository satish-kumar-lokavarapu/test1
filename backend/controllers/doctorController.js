// imported required dependencies
const Doctor = require("../models/doctModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointModel");
const User = require("../models/userModel");
const Prescription = require("../models/prescription");
const doctorController = require('../controllers/doctorController');
const userService = require('../services/userService');
const doctorService = require('../services/doctorService');
const appointmentService = require('../services/appointmentService');
const prescriptionService = require('../services/prescriptionService');

// Function to retrive Doctors info by user id
const getDoctorInfoByUserId = async (req, res) => {
    try {
        const doctor = await doctorService.searchOne({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: "Doctor info fetched successfully",
            data: doctor,
        });
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error getting doctor info", success: false, error });
    }
};

// Function to retrive doctorinfo by id
const getDoctorInfoById = async (req, res) => {
    try {

        const doctor = await doctorService.searchOne({ _id: req.body.doctorId });
        res.status(200).send({
            success: true,
            message: "Doctor info fetched successfully",
            data: doctor,
        });
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error getting doctor info", success: false, error });
    }
};

// Function to retrive doctor profile
const updateDoctorProfile = async (req, res) => {
    try {
      const doctor = await doctorService.update(
        { userId: req.body.userId },
        req.body
      );
      res.status(200).send({
        success: true,
        message: "Doctor profile updated successfully",
        data: doctor,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error getting doctor info", success: false, error });
    }
  };

  // Function to retrive appointments for particular doctor by doctor-id
  const getAppointmentsByDoctorId = async (req, res) => {
    try {
      const doctor = await doctorService.searchOne({ userId: req.body.userId });
      const appointments = await appointmentService.search({ doctorId: doctor._id });
      res.status(200).send({
        message: "Appointments fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error fetching appointments",
        success: false,
        error,
      });
    }
  }
  
  // Function to retrive appointments by appointment-id
  const getAppointmentsByAppointmentId = async (req, res) => {
    try {
      const appointments = await appointmentService.search({ _id: req.body.Id });
      res.status(200).send({
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
      });
    }
  }

  // Function to retrive prescriptions prescription-id
  const getPrescriptionsById = async (req, res) => {
    try {
      const prescription = await prescriptionService.search({ appointmentId: req.body.Id });
      res.status(200).send({
        success: true,
        data: prescription
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
      });
    }
  }

  // Function to retrive appointments status in doctor role
  const changeAppointmentStatus = async (req, res) => {
    try {
      const { appointmentId, status } = req.body;
      const appointment = await appointmentService.findAndUpdate(appointmentId, {
        status,
      });
      const user = await userService.searchOne({ _id: appointment.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "appointment-status-changed",
        message: `Your appointment status has been ${status}`,
        onClickPath: "/appointments",
      });
      await user.save();
      res.status(200).send({
        message: "Appointment status updated successfully",
        success: true
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error changing appointment status",
        success: false,
        error,
      });
    }
  };

  // Function to retrive prescriprion doctor-id
  const getPrescriptionByDoctorId = async (req, res) => {
    try {
        const doctor = await doctorService.searchOne({ userId: req.body.userId });
        const prescription = await prescriptionService.search({ doctorId: doctor._id });
      res.status(200).send({
        message: "Prescription fetched successfully",
        success: true,
        data: prescription,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error fetching prescriptions",
        success: false,
        error,
      });
    }
  }

  // Function to add prescription in doctor-login
  const doctorhomeAddprescription = async (req, res) => {
    try {
      const PrescriptionExists = await prescriptionService.searchOne({ appointmentId: req.body.appointmentId });
    if (PrescriptionExists) {
      return res
        .status(200)
        .send({ message: "Prescription already exists", success: false });
    }
    
        const payload = req.body;
        prescriptionService.save(payload);
      res
        .status(200)
        .send({ message: "Prescription created successfully", success: true });
    } catch (error){
        console.log(error);
    }
  };

  // Function to add Rating for a particular doctor after their appointment
  const patienthomeAddrating =  async (req, res) => {
    try {
     
      let upid = req.body.appointmentId;
      let upreview = req.body.Review;
      let uprating = req.body.Rating;
      let docId = req.body.appointmentInfo[0].doctorId;
      const doctor = await Doctor.findOne({ _id : docId});
      let n = doctor.numOfReviews
      let r = doctor.rating
      upDoct = await Doctor.findOneAndUpdate({_id:docId},{$set:{rating:(r*(n)+Number(uprating))/(n+1),numOfReviews:n + 1}},{new:true});
      Appointment.findOneAndUpdate({_id:upid},{$set:{review:upreview,rating:uprating}},{new:true},(err,data) => {
        if(data == null){
            res.send("no data is found")
        }
        else {
          res
            .status(200)
            .send({ message: "Rating created successfully", success: true });
        }
    })
       } 
      catch (error){
        console.log(error);
        res.send("error");
       }
  
  };
  // Function to retrive Ratings by Rating-Id
const getRatingsById = async (req, res) => {
    try {
    const rate = await appointmentService.search({ _id: req.body.Id })
      res.status(200).send({
        success: true,
        data: rate
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
      });
    }
  };
    

    module.exports = {
        getDoctorInfoByUserId,
        getDoctorInfoById,
        updateDoctorProfile,
        getAppointmentsByDoctorId,
        getAppointmentsByAppointmentId,
        getPrescriptionsById,
        changeAppointmentStatus,
        getPrescriptionByDoctorId,
        doctorhomeAddprescription,
        patienthomeAddrating,
        getRatingsById
    }