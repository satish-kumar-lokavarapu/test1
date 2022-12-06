import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [page,setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/user/get-appointments-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const columns = [
    {
      title:"Index",
      dataIndex:"index",
      render:(value, item, index) => <span>{(page-1) * 10 + index+1}</span>
  
    },
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => (
        <span>
          {record.doctorInfo.phoneNumber}
        </span>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "View Prescription",
      dataIndex: "add p",
      render: (text, record) => <span className="anchor"  onClick={() => navigate(`/view/${record._id}`)}>Click Here</span>

    },
    
    {
      title: "Add Rating/Review",
      dataIndex: "Rating",
      render:(text,record) => <span  className="anchor" onClick={() => navigate(`/rating/${record._id}`)} id = {record._id}>Click To Add</span>
    },
    {
      title: "View Rating/Review",
      dataIndex: "Rating",
      render:(text,record) => <span className="anchor" onClick={() => navigate(`/view/rating/${record._id}`)} id = {record._id}>Click To View</span>
    },
    
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return <Layout>
    <h1 className="page-title">Appointments</h1>
    <hr />
    <Table rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} columns={columns} dataSource={appointments} pagination={{pageSize : 5}} />
  </Layout>
}

export default Appointments;
