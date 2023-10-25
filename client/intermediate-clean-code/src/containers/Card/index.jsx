import React from "react";
import axios from "../../api";
import { useEmployeeContext } from "../../contexts/EmployeeContext";

function CardContainer() {
  const { newWage, employeeList, updateWageButton, updateEmployeeList } =
    useEmployeeContext();

  function updateEmployeeWage(id) {
    axios
      .put("/update", { wage: newWage, id: id })
      .then((res) => {
        updateEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteEmployee(id) {
    axios
      .delete(`/delete/${id}`)
      .then((res) => {
        updateEmployeeList(
          employeeList.filter((val) => {
            return val.id !== id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {employeeList.map((val, key) => {
        return (
          <div className="card" key={key}>
            <div className="card-body text-left">
              <p className="card-text">Name: {val.name}</p>
              <p className="card-text">Age: {val.age}</p>
              <p className="card-text">Country: {val.country}</p>
              <p className="card-text">Position: {val.position}</p>
              <p className="card-text">Wage: {val.wage}</p>
              <div className="d-flex">
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "300px" }}
                  placeholder="15000..."
                  onChange={(event) => {
                    updateWageButton(event.target.value);
                  }}
                />
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CardContainer;
