import React from "react";
import Input from "../../components/Input";
import { useEmployeeContext } from "../../contexts/EmployeeContext";
import axios from "../../api";
/* import Button from "../../components/Button"; */

function FormContainer() {
  const {
    name,
    age,
    country,
    position,
    wage,
    employeeList,
    updateName,
    updateAge,
    updateCountry,
    updatePosition,
    updateWageForm,
    updateEmployeeList,
  } = useEmployeeContext();

  function addEmployee() {
    const payload = {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    };

    axios
      .post("/create", payload)
      .then(() => {
        updateEmployeeList([
          ...employeeList,
          {
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form action="">
      <Input
        title="Name"
        type="text"
        placeholder="Enter name"
        onChange={(event) => {
          updateName(event.target.value);
        }}
      />
      <Input
        title="Age"
        type="number"
        placeholder="Enter age"
        onChange={(event) => {
          updateAge(event.target.value);
        }}
      />
      <Input
        title="Country"
        type="text"
        placeholder="Enter country"
        onChange={(event) => {
          updateCountry(event.target.value);
        }}
      />
      <Input
        title="Position"
        type="text"
        placeholder="Enter position"
        onChange={(event) => {
          updatePosition(event.target.value);
        }}
      />
      <Input
        title="Wage"
        type="number"
        placeholder="Enter wage"
        onChange={(event) => {
          updateWageForm(event.target.value);
        }}
      />
      <button className="btn btn-success" onClick={addEmployee}>
        Add Employee
      </button>
      {/* <Button
        className={"btn-success"}
        message={"Add Employee"}
        onClick={useAddEmployee}
      /> */}
    </form>
  );
}

export default FormContainer;
