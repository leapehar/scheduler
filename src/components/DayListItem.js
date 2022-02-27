import React from "react";
import classNames from "classnames";
import "./DayListItem.scss"

export default function DayListItem(props) {

  const numOfSpots = (spots) => {
    if (spots === 0) {
      return "no sports remaining"
    }
    return `${spots} spots remining`;
  }

  let dayListItemClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0

  })



  return (
    <li onClick={() => props.setDay(props.name)} >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{numOfSpots(props.spots)}</h3>
    </li>
  );
}

