import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authHeader } from "../../helpers";
import { queryAllEmployees, apiUrl } from "../../constants/service.constants";
import {
  getListRequest,
  getListSuccess,
  getListFailure,
  voteEmployeeSuccess
} from "./employeeSlice";
import { EmployeeListItem } from "./EmployeeListItem";
import styles from "./Employee.module.css";

const requestOptions = {
  method: "POST",
  headers: authHeader(),
  body: JSON.stringify({ query: queryAllEmployees })
};

export function EmployeeList() {
  const { employees, isLoading, errorMessage } = useSelector(
    state => state.employee
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!employees || employees.length == 0) {
      dispatch(getListRequest());
      setTimeout(() => {
        fetch(apiUrl, requestOptions).then(
          response => {
            if (response.ok) {
              response.json().then(json => {
                dispatch(getListSuccess(json.data.allEmployees));
              });
            } else {
              dispatch(getListFailure("Hata Oluştu"));
            }
          },
          response => {
            dispatch(getListFailure("Hata Oluştu"));
          }
        );
      }, 2000);
    }
  }, []);

  function voteEmployee(id) {
    dispatch(voteEmployeeSuccess(id));
  }

  return (
    <div className={styles["employee-list"]}>
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        // employees
        [...employees]
          .sort((a, b) => {
            return a.voteCount > b.voteCount ? 1 : -1;
          })
          .map((e, i) => {
            return (
              <EmployeeListItem
                data={e}
                styles={styles}
                key={e.id}
                vote={voteEmployee}
              />
            );
          })
      )}
    </div>
  );
}
