import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { authHeader } from "../../helpers";
import { queryEmployeeById, apiUrl } from "../../constants/service.constants";
import {
  getEmployeeDetailRequest,
  getEmployeeDetailSuccess,
  getEmployeeDetailFailure
} from "./employeeSlice";

const requestOptions = id => {
  return {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ query: queryEmployeeById(id) })
  };
};

export function Employee() {
  let history = useHistory();
  let { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeeDetailRequest());
    fetch(apiUrl, requestOptions(id)).then(
      response => {
        if (response.ok) {
          response.json().then(json => {
            dispatch(getEmployeeDetailSuccess(json.data.employee));
          });
        } else {
          dispatch(getEmployeeDetailFailure("Hata Oluştu"));
        }
      },
      response => {
        dispatch(getEmployeeDetailFailure("Hata Oluştu"));
      }
    );
  }, []);

  const {
    employees,
    employeeDetail,
    isDetailLoading,
    detailErrorMessage
  } = useSelector(state => state.employee);

  let back = e => {
    e.stopPropagation();
    history.push("/");
  };
  if (!employees || employees.length == 0) {
    history.push("/");
  }
 
  const employee = employees.find(x => x.id == id);
  return (
    <div>
      <button type="button" onClick={back}>
        Close
      </button>
      {employee && (
        <div>
          <img src={employee.photo} alt="" />
          <div>
            <p>
              <b>Name: </b>
              {employee.firstName}
            </p>
            <p>
              <b>Surname: </b>
              {employee.lastName}
            </p>
            <p>
              <b>Title: </b>
              {employee.department.name}
            </p>
          </div>
          {isDetailLoading ? (
            <p>Loading...</p>
          ) : detailErrorMessage ? (
            <p>{detailErrorMessage}</p>
          ) : (
            <div>
              <p><b>Adress: </b>{employeeDetail.address}</p>
              <p><b>Email: </b>{employeeDetail.email}</p>
              <p><b>Phone: </b>{employeeDetail.phone}</p>
              <p><b>Company: </b>{employeeDetail.company && employeeDetail.company.name}</p>
              <p><b>About: </b>{employeeDetail.about}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
