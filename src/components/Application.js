import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";

import DayList from "./DayList";
import "components/Application";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview} from "helpers/selectors";


export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  })

  //booking interview
  const bookInterview = (id, interview) => {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then((response) => {
        return setState({...state, appointments});
      })
      .catch(err => console.log(err));


  }





  const setDay = (day) => setState({...state, day});
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
      />
    );
  });



  useEffect(() => {



    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const [first, second, third] = all;

      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data}))



      // console.log(first, second, third);
    })
  }, [props.interviewers])

  //const setDays = (days) => setState(prev => ({...prev, days}));




  return (
    <main className="layout">
      <section className="sidebar">
        <img className=" schedule " src="images/logo.png "></img>
        <nav className="sidebar__menu">
          <DayList
            // days={days}
            // day={day}
            // setDay={setDay}

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
