import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { notification, Table } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import  {useNavigate}  from "react-router-dom";



function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [page,setPage] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        "/api/doctor/get-appointments-by-doctor-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/doctor/change-appointment-status",
        { appointmentId : record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
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
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Add Prescription",
      dataIndex: "add p",
      render:(text,record) => <span className="anchor" onClick={() => navigate(`/${record._id}`)} id = {record._id}>Ckick To Add</span>

    },

    {
      title: "View Prescription",
      dataIndex: "add p",
      render:(text,record) => <span className="anchor" onClick={() => navigate(`/view/${record._id}`)}>View Prescription</span>

    },
    {
      title: "View Rating/Review",
      dataIndex: "Rating",
      render:(text,record) =><div className="anchor"> <span onClick={() => navigate(`/view/rating/${record._id}`)} id = {record._id}>Click To View</span></div>

    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <h1
                className="anchor px-2"
                onClick={() => changeAppointmentStatus(record, "approved")}
              >
                Approve
              </h1>
              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "rejected")}
              >
                Reject
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return (
    
    <Layout>
      <h1 className="page-header">Appointments</h1>
      <hr />
      <Table rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}columns={columns} dataSource={appointments} pagination={{pageSize : 5}} />
    </Layout>
  );
}

export default DoctorAppointments;
