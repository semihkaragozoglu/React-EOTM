import { createSlice } from "@reduxjs/toolkit";
import { StaticRouter } from "react-router-dom";

export const slice = createSlice({
  name: "employee",
  initialState: {
    isLoading: false,
    employees: [],
    errorMessage: "",
    isDetailLoading: false,
    employeeDetail: {},
    detailErrorMessage: ""
  },
  reducers: {
    getListRequest: (state, action) => {
      state.isLoading = true;
    },
    getListSuccess: (state, action) => {
      state.employees = action.payload;
      state.isLoading = false;
    },
    getListFailure: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    getEmployeeDetailRequest: state => {
      state.isDetailLoading = true;
    },
    getEmployeeDetailSuccess: (state, action) => {
      state.employeeDetail = action.payload;
      state.isDetailLoading = false;
    },
    getEmployeeDetailFailure: (state, action) => {
      state.isDetailLoading = false;
      state.detailErrorMessage = action.payload;
    },
    voteEmployeeSuccess: (state, action) => {
      state.employees = state.employees.map((e, i) => {
        if (e.id == action.payload) {
          e.voteCount++;
        }
        return e;
      });
    },
    voteEmployeeRequest: () => {},
    voteEmployeeFailure: () => {}
  }
});

export const {
  getListRequest,
  getListSuccess,
  getListFailure,
  getEmployeeDetailFailure,
  getEmployeeDetailSuccess,
  getEmployeeDetailRequest,
  voteEmployeeSuccess
} = slice.actions;

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default slice.reducer;
