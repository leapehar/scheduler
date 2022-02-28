import React from "react";
import "./styles.scss"



export default function Appointment(props) {
  let appointmentInfo;
  if (props.time) {
    appointmentInfo = `Appointment at ${props.time}`;
  } else {
    appointmentInfo = "No Appointments";
  }


  return (
    <article className="appointment">
      {appointmentInfo}</article>

  )
}
