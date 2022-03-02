


export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter(dayItem => dayItem.name === day);

  if (filteredDay.length === 0) {
    return filteredDay;
  }


  let array = [];
  let appoitmentArray = filteredDay[0].appointments;

  const appointments = state.appointments;

  for (const appointment of Object.values(appointments)) {
    if (appoitmentArray.includes(appointment["id"])) {
      array.push(appointment);
    }
  }

  return array;





}
