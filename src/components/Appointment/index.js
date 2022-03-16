import React, {Fragment} from 'react';
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import {action} from '@storybook/addon-actions';
import Status from './Status';
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = 'EDIT';
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


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

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));

  }
  // come back later to fix interviewer bug

  // let appointmentInfo = props.interview ? <Show student={props.interview.student} /> : <Empty />

  function onDelete() {
    transition(CONFIRM);
  };

  function onConfirm() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true)
      })
  }

  function onEdit() {
    transition(EDIT);
  }


  return (
    <Fragment>

      <article className="appointment">
        <Header time={props.time}>
        </Header>

        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
        {mode === SAVE && <Status message="Saving" />}
        {mode === CONFIRM && <Confirm message=" Are you sure you would like to delete?" onCancel={back} onConfirm={onConfirm} />}
        {mode === DELETE && <Status message="Deleting" />}

        {mode === EDIT &&
          <Form student={props.interview && props.interview.student} interviewer={props.interview && props.interview.interviewer && props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
        {mode === ERROR_SAVE && <Error message="Error: could not save" onClose={() => transition(EDIT)} />}
        {mode === ERROR_DELETE && <Error message="Error: could not delete appointment" onClose={() => transition(SHOW)} />}

      </article>
    </Fragment>
  )
}
