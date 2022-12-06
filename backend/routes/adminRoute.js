// Routes for Admin profile
// importing the required dependencies
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctModel");
const authMiddleware = require("../middlewares/authMiddleware");
const adminController = require('../controllers/adminController');

// route for fetchong the all the doctors in admin login
router.route("/get-all-doctors").get(authMiddleware, adminController.getAllDoctors)

// route for fetchong the all the users in admin login 
router.route("/get-all-users").get(authMiddleware, adminController.getAllUsers)

// route to approve or block the doctor application
router.route("/change-doctor-account-status").post(authMiddleware, adminController.changeDoctorAccountStatus)


module.exports = router;
