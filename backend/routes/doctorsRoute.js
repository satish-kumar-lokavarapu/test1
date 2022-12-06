// Routes for Doctor profile
// importing the required dependencies
const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointModel");
const User = require("../models/userModel");
const Prescription = require("../models/prescription");
const doctorController = require('../controllers/doctorController');

// Route to retrive doctorinfo by user-id
router.route("/get-doctor-info-by-user-id").post(authMiddleware, doctorController.getDoctorInfoByUserId)

// Route to retrive doctorinfo by id
router.route("/get-doctor-info-by-id").post(authMiddleware, doctorController.getDoctorInfoById)

// Route to retrive doctor profile
router.route("/update-doctor-profile").post(authMiddleware, doctorController.updateDoctorProfile)

// Route to retrive appointments for particular doctor by doctor-id
router.route("/get-appointments-by-doctor-id").get(authMiddleware, doctorController.getAppointmentsByDoctorId)

// Route to retrive appointments by appointment-id
router.route("/get-appointments-by-appointment-id").post(authMiddleware, doctorController.getAppointmentsByAppointmentId)

// Route to retrive prescriptions prescription-id
router.route("/get-prescriptions-by-id").post(authMiddleware, doctorController.getPrescriptionsById)

// Route to retrive appointments status in doctor role
router.route("/change-appointment-status").post(authMiddleware, doctorController.changeAppointmentStatus)

// Route to retrive prescriprion doctor-id
router.route("/get-prescription-by-doctor-id").get(authMiddleware, doctorController.getPrescriptionByDoctorId)

// Route to add prescription in doctor-login
router.route("/doctorhome/addprescription").post(authMiddleware, doctorController.doctorhomeAddprescription)

// Route to add Rating for a particular doctor after their appointment
router.route("/patienthome/addrating").post(authMiddleware, doctorController.patienthomeAddrating)

// Route to retrive Ratings by Rating-Id
router.route("/get-ratings-by-id").post(authMiddleware, doctorController.getRatingsById)

module.exports = router;
