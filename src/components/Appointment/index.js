import React, {Fragment} from 'react';
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";


export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // come back later to fix interviewer bug

  // let appointmentInfo = props.interview ? <Show student={props.interview.student} /> : <Empty />


  return (
    <Fragment>

      <article className="appointment">
        <Header time={props.time}>
          {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
            />
          )}
        </Header>
        {/*appointmentInfo*/}




      </article>

    </Fragment>




  )
}
