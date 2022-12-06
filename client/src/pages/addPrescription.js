import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


import PrescriptionForm from "../components/PrescriptionForm";

function AddPrescription(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const getAppointmentData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-appointments-by-appointment-id",
        {
          Id: params.appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getAppointmentData();
  }, []);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "api/doctor/doctorhome/addprescription",
        {
          ...values,
          userId: user._id,
          appointmentId: params.appointmentId,
          appointmentInfo: appointments,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/doctor/appointments");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1>prescription</h1>
      <PrescriptionForm onFinish={onFinish} />
    </Layout>
  );

  }
export default AddPrescription;
