import React, {useState} from "react";
import axios from "axios";
import "components/Application.scss";

import DayList from "./DayList";
import "components/Application";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";





export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}

  // })

  // //booking interview
  // const bookInterview = (id, interview) => {
  //   console.log(id, interview);

  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: {...interview}
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   return axios.put(`/api/appointments/${id}`, {interview})
  //     .then((response) => {
  //       return setState({...state, appointments});
  //     })
  //     .catch(err => console.log(err));
  // }

  // const cancelInterview = (id) => {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   return axios.delete(`/api/appointments/${id}`)
  //     .then(() => {
  //       setState({...state, appointments: appointments});
  //     })
  //     .catch(err => console.log(err.message))

  // }




  // const setDay = (day) => setState({...state, day});
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewersForDay = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        interviewers={interviewersForDay}

      />
    );
  });



  // useEffect(() => {



  //   Promise.all([
  //     axios.get('http://localhost:8001/api/days'),
  //     axios.get('http://localhost:8001/api/appointments'),
  //     axios.get('http://localhost:8001/api/interviewers')
  //   ]).then((all) => {
  //     const [first, second, third] = all;

  //     setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data}))




  //   })
  // }, [props.interviewers])





  return (
    <main className="layout">
      <section className="sidebar">
        <img className=" schedule " src="images/logo.png "></img>
        <nav className="sidebar__menu">
          <DayList


            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"></img>

      </section>
      <section className="schedule">
        {schedule}

        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}