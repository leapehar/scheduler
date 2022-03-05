import React, {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  })

  function spotsRemainingOnSave(appointment, id) {
    if (state.appointments[id].interview === null && appointment.interview !== null) {
      const selectedDay = state.days.find(day => day.name === state.day);
      selectedDay.spots--;
    }
  }

  function spotsRemainingOnDelete(appointment, id) {
    if (state.appointments[id].interview !== null && appointment.interview === null) {
      const selectedDay = state.days.find(day => day.name === state.day);
      selectedDay.spots++;
    }
  }

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
    spotsRemainingOnSave(appointment, id)
    return axios.put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        return setState({...state, appointments});
      })
    // .catch(error => console.log(error));
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    spotsRemainingOnDelete(appointment, id)
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({...state, appointments: appointments});
      })
      .catch(error => {
        console.log(error.message)
        throw Error(error);
      })

  }




  const setDay = (day) => setState({...state, day});

  useEffect(() => {



    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((response) => {
      // const [first, second, third] = all;

      setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}))
    })
  }, []);
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}