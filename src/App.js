import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { EmployeeList } from "./features/employee/EmployeeList";
import Layout from "./app/Layout";
import { Employee } from "./features/employee/Employee";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";

export const history = createBrowserHistory();
function App() { 
  return (
    <div className="App">
      <Router history={history}>
        <Layout>
          <Switch>
            <Route path="/" exact component={EmployeeList} />
            <Route path="/employees/:id" children={<Employee />} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}
export default App;
