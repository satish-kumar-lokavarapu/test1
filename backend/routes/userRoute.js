// Routes for User profile
// importing the required dependencies
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointModel");
const moment = require("moment");
require('dotenv').config();
const Razorpay = require('razorpay');
const stripe = require('stripe');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const userController = require('../controllers/userController');

// Route to register as a User
router.route("/register").post(userController.register);

// Route to Login with user credentials
router.route("/login").post(userController.login);

// Route for forget-password
router.route("/forget-password").post(userController.forgetPassword);

// Route for reset-password
router.route("/reset-password/:id/:token").post(userController.resetPassword);

// Route to get userinfo by uder-id
router.route("/get-user-info-by-id").post(authMiddleware, userController.getUserInfoById);

// Route to apply doctor role to admin
router.route("/apply-doctor-account").post(authMiddleware, userController.applyDoctorAccount);

// Route to mark all notifications as seen
router.route("/mark-all-notifications-as-seen").post(authMiddleware, userController.markAllNotificationsAsSeen);

// Route to delete all notifications
router.route("/delete-all-notifications").post(authMiddleware, userController.deleteAllNotifications);

// Route to approve doctors for admin as a role
router.route("/get-all-approved-doctors").get(authMiddleware, userController.getAllApprovedDoctors);

// Route to book appointment
router.route("/book-appointment").post(authMiddleware, userController.bookAppointment);

// Route for checking booking availablity
router.route("/check-booking-avilability").post(authMiddleware, userController.checkBookingAvilability);

// Route for payment
router.route("/payment").post(userController.payment)

// Route for payment verification
router.route("/payment/verify").post(userController.paymentVerify);

// Route to add Rating
router.route("/rating").post(userController.rating);

// Route to get appointments by user-id
router.route("/get-appointments-by-user-id").get(authMiddleware, userController.getAppointmentsByUserId);

module.exports = router;
