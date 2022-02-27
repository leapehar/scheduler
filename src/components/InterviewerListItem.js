
import React from 'react';
import classNames from "classnames";
import "./InterviewerListItem.scss"

export default function DayListItem(props) {

  //css styles for interview item
  let interviewItemClasses = classNames(
    "interviewers__item", {"interviewers__item--selected": props.selected});

  //css styles for images
  const imageClasses = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  });


  return (
    <li className={interviewItemClasses} key={props.id} onClick={props.setInterviewer}>
      <img
        className={imageClasses}
        src={props.avatar}
        alt={props.name}
      />

      {/* if selected, render the picture and name, else no name */}
      {props.selected ? props.name : ""}
    </li>
  )
}