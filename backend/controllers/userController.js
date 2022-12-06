// Imported required dependencies
const User = require("../models/userModel");
const Doctor = require("../models/doctModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Appointment = require("../models/appointModel");
const moment = require("moment");
require('dotenv').config();
const Razorpay = require('razorpay');
const stripe = require('stripe');
const nodemailer = require('nodemailer');
const userService = require('../services/userService');
const doctorService = require('../services/doctorService');
const appointmentService = require('../services/appointmentService');
const crypto = require('crypto');

// Function to register as a User
const register = async (req, res) => {
    try {
        const userExists = await userService.searchOne({ email: req.body.email });
        if (userExists) {
            return res
                .status(200)
                .send({ message: "User already exists", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const payload = req.body
        await userService.save(payload);    //newuser.save();

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rajanikshith7@gmail.com',
                pass: 'mshjxronfklfvmmf'
            }
        });

        var mailOptions = {
            from: 'rajanikshith7@gmail.com',
            to: `${req.body.email}`,
            subject: 'Welcome to the MedConsult Application',
            text: `Dear ${req.body.name} \n You are register to the MedConsult successfully.\n\n\n Thanks, \n MedConsult staff `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


        res
            .status(200)
            .send({ message: "User created successfully", success: true });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error registration ", success: false, error });
  
    }
}

// Function to Login with user credentials
const login = async (req, res) => {
    try {
        const user = await userService.searchOne({ email: req.body.email })
        if (!user) {
            return res
                .status(200)
                .send({ message: "User does not exist", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .send({ message: "Password is incorrect", success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            res
                .status(200)
                .send({ message: "Login successful", success: true, data: token });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error in logging ", success: false, error });
    }
}

// Function for forget-password
const forgetPassword = async (req, res) => {
    try {
        const user = await userService.searchOne({ email: req.body.email });
        if (!user) {
            return res
                .status(200)
                .send({ message: "User does not exist", success: false });
        }
        
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rajanikshith7@gmail.com',
                pass: 'mshjxronfklfvmmf'
            }
        });
        var mailOptions = {
            from: 'rajanikshith7@gmail.com',
            to: `${req.body.email}`,
            subject: 'reset password',
            text: `Dear ${user.name} \n You are reset password to the MedConsult is below. Click the link and reset the password \n\n ${link} .\n\n\n Thanks, \n Medcare staff `

        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res
            .status(200)
            .send({ message: `email sent to ${req.body.email} successful`, success: true });
    }

    catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error in forgot password ", success: false, error });
    }
}

// Function for reset-password
const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const password = req.body.password
    const userEmail = req.body.email;
    try {
        const user = await userService.searchOne({ email: userEmail, _id: id });
        if (!user) {
            return res
                .status(200)
                .send({ message: "User does not exist", success: false });
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Auth failed",
                    success: false,
                });
            }
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const updatedUser = await userService.update(id, hashedPassword);
        res
            .status(200)
            .send({ message: "User password is reset successfully", success: true });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error reseting password ", success: false, error });
    }
}

// Function to get userinfo by uder-id
const getUserInfoById = async (req, res) => {
    try {

        const user = await userService.searchOne({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res
                .status(200)
                .send({ message: "User does not exist", success: false });
        } else {
            res.status(200).send({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error getting user info", success: false, error });
    }
}

// Function to apply doctor role to admin
const applyDoctorAccount = async (req, res) => {
    try {
        const payload = { ...req.body, status: "pending" };
        await doctorService.save(payload);
        const adminUser = await userService.searchOne({ isAdmin: true });
        const newdoctor = new Doctor({ ...req.body, status: "pending" });
        const unseenNotifications = adminUser.unseenNotifications;
        unseenNotifications.push({
            type: "new-doctor-request",
            message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
            data: {
                doctorId: newdoctor._id,
                name: newdoctor.firstName + " " + newdoctor.lastName,
            },
            onClickPath: "/admin/doctorslist",
        });
        const updatedUser = await userService.findAndUpdate(adminUser._id, { unseenNotifications })
        res.status(200).send({
            success: true,
            message: "Doctor account applied successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error applying doctor account",
            success: false,
            error,
        });
    }
}

// Function to mark all notifications as seen
const markAllNotificationsAsSeen = async (req, res) => {
    try {
        const user = await userService.searchOne({ _id: req.body.userId });
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications;
        seenNotifications.push(...unseenNotifications);
        user.unseenNotifications = [];
        user.seenNotifications = seenNotifications;
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notifications marked as seen",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error applying doctor account",
            success: false,
            error,
        });
    }
}

// Function to delete all notifications
const deleteAllNotifications = async (req, res) => {
    try {
        const user = await userService.searchOne({ _id: req.body.userId });
        user.seenNotifications = [];
        user.unseenNotifications = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notifications cleared",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error applying doctor account",
            success: false,
            error,
        });
    }
}

// Function to approve doctors for admin as a role
const getAllApprovedDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.search({ status: "approved" });
        res.status(200).send({
            message: "Doctors fetched successfully",
            success: true,
            data: doctors,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error applying doctor account",
            success: false,
            error,
        });
    }
}

// Function to book appointment
const bookAppointment = async (req, res) => {
    try {
        req.body.status = "pending";
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        const payload = req.body;
        const newAppointment = await appointmentService.save(payload);
        const user = await userService.searchOne({ _id: req.body.doctorInfo.userId });
        user.unseenNotifications.push({
            type: "new-appointment-request",
            message: `A new appointment request has been made by ${req.body.userInfo.name}`,
            onClickPath: "/doctor/appointments",
        });
        await user.save();
        res.status(200).send({
            message: "Appointment booked successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error booking appointment",
            success: false,
            error,
        });
    }
};

// Function for checking booking availablity
const checkBookingAvilability = async (req, res) => {
    try {
      const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      const appTime = moment(req.body.time, "HH:mm").toISOString();
      const fromTime = moment(req.body.time, "HH:mm")
        .subtract(1, "hours")
        .toISOString();
      const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
      const doctorId = req.body.doctorId;
      const doctor = await doctorService.searchOne({ _id: doctorId });
      const startTime = moment(doctor.timings[0],"HH:mm").toISOString();
      const endTime = moment(doctor.timings[1],"HH:mm").toISOString();
      const appointments = await appointmentService.search({
        doctorId,
        date,
        time: { $gte: fromTime, $lte: toTime },
      });
      if (appointments.length > 0  || appTime < startTime || appTime > endTime ) {
        return res.status(200).send({
          message: "Appointments not available",
          success: false,
        });
      } else {
        return res.status(200).send({
          message: "Appointments available",
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error booking appointment",
        success: false,
        error,
      });
    }
  };

// Function for payment
const payment = async(req,res) => {
    try{
      const doctor = await Doctor.findOne({ _id: req.body.id });
      const instance = new Razorpay({
        key_id:process.env.KEY_ID,
        key_secret:process.env.KEY_SECRET
      })
      const options = {
       amount:doctor.feePerCunsultation * 100,
       currency:"INR"
      }
      instance.orders.create(options,(error,order) => {
        if(error){
          console.log(error);
          return res.status(500).json({message:"something wrong"});
        }
        res.status(200).json({data:order,message:"gud",success:true});
      })
}
    catch(error){  
      res.status(500).send({
        message: "HI",
        success: false,
        error})
    }
  };

// Function for payment verification
const paymentVerify = async(req,res) => {
    try{
    const{
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
    } = req.body;
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256",process.env.KEY_SECRET).update(sign.toString()).digest("hex");
    if(razorpay_signature === expectedSign){
    return res.status(200).json({message:"Payment verified sucessfully",success:true});
    }
    else{
    return res.status(400).json({message:"Invalid Sign"});
    }
    }
    catch(error){
    res.status(500).send({
    message: "HI",
    success: false,
    error})
    }
   };
   const rating = async (req, res) => {
    try {
      const values = req.body;
      res
        .status(200)
        .send({ message: "Rating added successfully", data: values, success: true });
    } catch (error) {
                                              
    }
  };

  // Function to get appointments by user-id
  const getAppointmentsByUserId = async (req, res) => {
    try {
        const appointments = await appointmentService.search({ userId: req.body.userId });
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
  };

module.exports = {
    register,
    login,
    forgetPassword,
    resetPassword,
    getUserInfoById,
    applyDoctorAccount,
    markAllNotificationsAsSeen,
    deleteAllNotifications,
    getAllApprovedDoctors,
    bookAppointment,
    checkBookingAvilability,
    payment,
    paymentVerify,
    rating,
    getAppointmentsByUserId
    
}; 