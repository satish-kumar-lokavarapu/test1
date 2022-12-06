import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React,{useEffect,useState} from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import moment from "moment";
import {useParams } from "react-router-dom";
function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-doctor-account",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
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
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      
      toast.error("Something went wrong");
    }
  };
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/user/get-user-info-by-id",
          {
            userId: params.userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        dispatch(hideLoading());
        if (response.data.success) {
          setUserData(response.data.data);
       
          
        
        }
      } catch (error) {
        console.log(error);
        dispatch(hideLoading());
      }
    };
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />

      <UserForm onFinish={onFinish} initivalValues={userData} />
    </Layout>
  );
}

export default ApplyDoctor;
