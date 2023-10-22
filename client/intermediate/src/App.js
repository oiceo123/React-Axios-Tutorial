import { useState } from "react";
import axios from "./api/axios";

function App() {
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    axios.get("/employees").then((res) => {
      setEmployeeList(res.data);
    });
  };

  const getEmployeeById = () => {
    axios.get(`/employees?id=${id}`).then((res) => {
      setEmployeeList(res.data);
    });
  };

  const addEmployee = (event) => {
    /* event.preventDefault(); */

    const payload = {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    };

    axios.post("/create", payload).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const updateEmployeeWage = (id) => {
    axios.put("/update", { wage: newWage, id: id }).then((res) => {
      setEmployeeList(
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
    });
  };

  const deleteEmployee = (id) => {
    axios.delete(`/delete/${id}`).then((res) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App container">
      <h1>Employee Information</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter country"
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Position:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter position"
              onChange={(event) => {
                setPosition(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wage" className="form-label">
              Wage:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter wage"
              onChange={(event) => {
                setWage(event.target.value);
              }}
            />
          </div>
          <button className="btn btn-success" onClick={addEmployee}>
            Add Employee
          </button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <div className="d-flex">
          <button className="btn btn-primary" onClick={getEmployees}>
            Show all employees
          </button>
          <div className="ms-auto d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Search ID"
              onChange={(event) => setId(event.target.value)}
            />
            <button
              className="btn border border-black"
              onClick={getEmployeeById}
            >
              Search
            </button>
          </div>
        </div>
        <br />
        <br />
        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
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
                      setNewWage(event.target.value);
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
      </div>
    </div>
  );
}

export default App;
