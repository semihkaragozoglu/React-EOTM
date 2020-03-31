import React from "react";
import { Link, useLocation } from "react-router-dom";
export function EmployeeListItem(props) {
  const { firstName, lastName, photo, department, id, voteCount } = props.data;
  return (
    <div className={props.styles["employee-list-item"] + " card"}>
      <div className={props.styles["wrapper"]}>
        <div className={props.styles["description"]}>
          <img src={photo} alt="" />
          <p>
            <b>Name: </b>
            {firstName}
          </p>
          <p>
            <b>Surname: </b>
            {lastName}
          </p>
          <p>
            <b>Title: </b>
            {department.name}
          </p>
        </div>
        <div className={props.styles["actions"]}>
          <Link
            to={{
              pathname: `/employees/${id}`
            }}
          >
            <button className={"btn btn-info btn-sm"}>Detail</button>
          </Link>
          <span>
            Votes:
            {voteCount}
          </span>
          <button
            className={"btn btn-success btn-sm"}
            onClick={() => {
              props.vote(id);
            }}
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}
