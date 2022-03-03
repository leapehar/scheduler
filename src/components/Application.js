import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";

import DayList from "./DayList";
import "components/Application";
import Appointment from "components/Appointment";
import {getAppointmentsForDay} from "helpers/selectors";





// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];


export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}

  })

  // const dailyAppointments = [];


  // causing error, fix later
  //setState(prev => ({...prev, days}));


  const setDay = (day) => setState({...state, day});
  const dailyAppointments = getAppointmentsForDay(state, state.day)


  useEffect(() => {



    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const [first, second, third] = all;

      setState(prev => ({...prev, days: first.data, appointments: second.data}))



      console.log(first, second, third);
    });
  }, [])

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
        {dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
