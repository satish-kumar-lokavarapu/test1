import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";

function PrescriptionsList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const getprescriptionsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
      "/api/doctor/get-prescriptions-by-id",
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
        setPrescriptions(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getprescriptionsData();
  }, []);

  const columns = [
    {
      title: "Symptoms",
      dataIndex: "Symptoms",
    },
    {
      title: "Tests",
      dataIndex: "Tests",
    },
    {
      title: "Medicines",
      dataIndex: "Medicines",
    },
    {
      title: "Remarks",
      dataIndex: "Remarks",
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">Prescription List</h1>
      <hr />
      <Table rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} columns={columns} dataSource={prescriptions}  pagination={{pageSize : 5}}/>
    </Layout>
  );
}

export default PrescriptionsList;
