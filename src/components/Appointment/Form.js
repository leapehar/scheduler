import React, {useState} from 'react';
import Button from "components/Button";
import InterviewerList from "../InterviewerList"

export default function From(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [errorMessage, setErrorMessage] = useState();

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const validate = () => {
    if (student === "" || student === null) {
      setErrorMessage("Student name cannot be empty");
      return;
    }

    if (interviewer === null) {
      setErrorMessage("You must choose an interviewer");
      return;
    }
    props.onSave(student, interviewer);

  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"


            value={student}
            onChange={(event) => {setStudent(event.target.value)}}
            data-testid="student-name-input"
          /*
            This must be a controlled component
            your code goes here
          */
          />
          {errorMessage}
        </form>
        <InterviewerList
          /* your code goes here */
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}

        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => {
            cancel();

          }} >Cancel</Button>
          <Button confirm onClick={() => {

            validate(student, interviewer)
          }}>Save</Button>
        </section>
      </section>
    </main>
  )
}