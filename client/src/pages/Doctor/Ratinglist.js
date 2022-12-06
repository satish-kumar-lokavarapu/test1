import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";

function RatingList() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const getRatingData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
      "/api/doctor/get-ratings-by-id",
      {
        Id: params.appointmentId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getRatingData();
  }, []);

  const columns = [
    {
      title: "Review",
      dataIndex: "review",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">Review and Rating</h1>
      <hr />
      <Table rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} columns={columns} dataSource={appointments} pagination={{pageSize : 5}} />
    </Layout>
  );
}

export default RatingList;
