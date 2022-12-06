import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Doctor from "../components/Doctor";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
function Home() {
  const [doctors, setDoctors] = useState([]);
  const [searchNameTerm, setSearchNameTerm] = useState([]);
  const [searchSpecTerm, setSearchSpecTerm] = useState([]);
  const dispatch = useDispatch();
  const searchDoctorsByName = async () => {
    try {
      dispatch(showLoading());
      dispatch(hideLoading());
    }
    catch {

    }
  };
  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading())
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <div className="headerCenter">
        <div>
        <h1>List of Doctors</h1>
        </div>
        <div>
        <input type="text" className="spaceBtn" placeholder="Search Doctor" onChange={(event) => setSearchNameTerm(event.target.value)}></input>
        <select id="specialization" className="dropdown" name="specialization" onChange={(event) => setSearchSpecTerm(event.target.value)} >
          <option value="">Select Specialization</option>
          <option value="Ent">ENT Specialist</option>
          <option value="Skin">Skin Specialist</option>
          <option value="Dentist">Dentist</option>
          <option value="Heart">Heart Specialist</option>
          <option value="Lung">Lung Specialist</option>
          <option value="Neuro">Neuro Specialist</option>
        </select>
        </div>
      </div>
      <hr />
      <Row gutter={20}>
        {doctors.filter((val) => {
          if ((searchNameTerm == "" || val.firstName.toLowerCase().includes(searchNameTerm.toLowerCase())) && (searchSpecTerm == "" || val.specialization.toLowerCase().startsWith(searchSpecTerm.toLowerCase()))) {
            return val
          }

        }).map((doctor) => (

          <Col span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>

    </Layout>
  );
}

export default Home;
