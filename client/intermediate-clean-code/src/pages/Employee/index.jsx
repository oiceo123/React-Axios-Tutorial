import React from "react";
import axios from "../../api";
import { useEmployeeContext } from "../../contexts/EmployeeContext";
import HeaderContainer from "../../containers/Header";
import FormContainer from "../../containers/Form";
import SearchContainer from "../../containers/Search";
import CardContainer from "../../containers/Card";

function Employee() {
  const { updateEmployeeList } = useEmployeeContext();

  function getEmployee() {
    axios
      .get("/employees")
      .then((res) => {
        updateEmployeeList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <HeaderContainer />
      <FormContainer />
      <hr />
      <div className="d-flex">
        <button className="btn btn-primary" onClick={getEmployee}>
          Show all employees
        </button>
        <div className="ms-auto d-flex">
          <SearchContainer />
        </div>
      </div>
      <br />
      <br />
      <CardContainer />
    </div>
  );
}

export default Employee;
