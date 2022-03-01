import React, {Fragment} from 'react';
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"




export default function Appointment(props) {
  // let appointmentInfo;
  // if (props.time) {
  //   appointmentInfo = `Appointment at ${props.time}`;
  // } else {
  //   appointmentInfo = "No Appointments";
  // }


  // come back later to fix interviewer bug

  let appointmentInfo = props.interview ? <Show student={props.interview.student} /> : <Empty />


  return (
    <Fragment>

      <article className="appointment">
        <Header time={props.time}> </Header>
        {appointmentInfo}


      </article>

    </Fragment>




  )
}
