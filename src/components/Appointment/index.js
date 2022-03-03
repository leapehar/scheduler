import React, {Fragment} from 'react';
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";


export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE);

    props.bookInterview(props.id, interview);
    transition(SHOW);
  }
  // come back later to fix interviewer bug

  // let appointmentInfo = props.interview ? <Show student={props.interview.student} /> : <Empty />



  return (
    <Fragment>

      <article className="appointment">
        <Header time={props.time}>
        </Header>
        {/*appointmentInfo*/}


        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && <Form interviewers={[]} onCancel={() => back()} onSave={() => save()} />}

      </article>
    </Fragment>
  )
}
// *** We'll also need to add a new constant and update our Appointment component to show the Status component when mode === SAVING.

