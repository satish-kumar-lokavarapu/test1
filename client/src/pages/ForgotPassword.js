import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/forget-password", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Forget Password</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" required rules={[{
            message: 'Enter valid email',
            validator: (_, value) => {
              if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                return Promise.resolve();
              } else {
                return Promise.reject('email field is rejected');
              }
            }
            }]}>
            <Input placeholder="Email" />
          </Form.Item>
          
          <Button className="primary-button my-2 full-width-button" htmlType="submit">
            SUBMIT
          </Button>
         
        </Form>
      </div>
    </div>
  );
}

export default ForgetPassword;
