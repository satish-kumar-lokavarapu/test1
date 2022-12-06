import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function ResetPassword(props) {
  const url_parse = window.location.href.split("/");
  const id = url_parse[4];
  const token = url_parse[5];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
        const {password , conformPassword} = values
        if(password !== conformPassword)
        {
            toast.error("password missmatched");
            navigate("/forgot-password");
        }
    try {
      dispatch(showLoading());
      const response = await axios.post(`/api/user/reset-password/${id}/${token}`, values);
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
        <h1 className="card-title">Reset Password</h1>
        <Form layout="vertical" onFinish={onFinish}>
          
          <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" required rules={[{ required: true }]}>
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Form.Item label="Conform Password" name="conformPassword" required rules={[{ required: true }]}>
            <Input placeholder="Conform Password" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            RESET
          </Button>

          
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
