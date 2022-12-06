// Imported required dependencies
import React from "react";
import { useNavigate } from "react-router-dom";
import "../dist/cardStyles.css";

// this file mainly has layout of Doctor information for users to book appointment spec, fees, timmings etc
function Doctor({ doctor }) {
  const navigate = useNavigate();
  return (
    <div 
      className="cursor-pointer cards"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <div className="top">
      <h1 className="name">
        {doctor.firstName} {doctor.lastName}
      </h1>
      </div>
      <div className="bottom">
      <p className="info">
        <b>Specialization : </b>
        {doctor.specialization}
      </p>
      <p className="info">
        <b>Rating : </b>
        {doctor.rating}
      </p>
      <p className = "info">
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p className="info">
        <b>Address : </b>
        {doctor.address}
      </p>
      <p className="info">
        <b>Fee per Visit : </b>
        {doctor.feePerCunsultation}
      </p>
      <p className="info">
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
      </div>
    </div>
  );
}

export default Doctor;
