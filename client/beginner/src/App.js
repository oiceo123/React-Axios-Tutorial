import axios from "axios";
import { useState } from "react";
import useEffectOnce from "./useEffectOnce";

function App() {
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  // การดัก Error ใน axios
  /* const getEmployees = () => {
    axios
      .get("http://localhost:3001/employees")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response) {
          // ส่ง request ไปแล้วได้รับ response status code ที่ไม่ได้อยู่ในช่วง 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // ส่ง request แต่ไม่ได้รับ response กลับมา
          console.log(err.request);
        } else {
          // หากไม่เข้าเงื่อนไขไหนเลยจะเข้า case นี้
          console.log("Error:", err.message);
          console.log(err.config);
          console.log(err.toJSON()); // ไว้ดูข้อมูลเพิ่มเติมเกี่ยวกับ HTTP error
        }
      });
  }; */

  // axios ไม่ใช้ async/await
  /* const getEmployees = () => {
    axios
      .get("http://localhost:3001/employees")
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("error", err);
      });

    console.log("End");
  }; */

  // axios ใช้ async/await
  /* const getEmployees = async () => {
    await axios
      .get("http://localhost:3001/employees")
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("error", err);
      });

    console.log("End");
  }; */

  // axios ใช้ async/await แต่มีการเรียกใช้ฟังก์ชั่น 2 ฟังก์ชั่นในระดับเดียวกันโดยไม่ใช้ async/await
  /* useEffectOnce(() => {
    getEmployees1();
    displayStart();
  }); */

  // axios ใช้ async/await แต่มีการเรียกใช้ฟังก์ชั่น 2 ฟังก์ชั่นในระดับเดียวกันโดยใช้ async/await
  /* useEffectOnce(async () => {
    await getEmployees1()
    await displayStart()
  }); */

  /* const getEmployees1 = async () => {
    await axios
      .get("http://localhost:3001/employees")
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("error", err);
      });

    console.log("End");
  }; */

  /* const displayStart = async () => {
    await axios
      .get("http://localhost:3001/employees")
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("error", err);
      });

    console.log("Starting...");
  }; */

  // Concurency ของ axios ไม่ใช้ async/await
  /* const getEmployees = () => {
    const reqEmployee1 = axios.get("http://localhost:3001/employees");
    const reqEmployee2 = axios.get("http://localhost:3001/employees?id=11");

    Promise
      .all([reqEmployee1, reqEmployee2])
      .then(
        axios.spread((res1, res2) => {
          console.log("res1", res1);
          console.log("res2", res2);
        })
      )
      .catch((err) => {
        console.error(err);
      });

    console.log("End")
  }; */

  // Concurency ของ axios ใช้ async/await
  /* const getEmployees = async () => {
    const reqEmployee1 = axios.get("http://localhost:3001/employees");
    const reqEmployee2 = axios.get("http://localhost:3001/employees?id=11");

    await Promise.all([reqEmployee1, reqEmployee2])
      .then(
        axios.spread((res1, res2) => {
          console.log("res1", res1);
          console.log("res2", res2);
        })
      )
      .catch((err) => {
        console.error(err);
      });

    console.log("End");
  }; */

  // Concurency ของ axios ใช้ async/await และ try,catch
  /* const getEmployees = async () => {
    try {
      const reqEmployee1 = axios.get("http://localhost:3001/employees11");
      const reqEmployee2 = axios.get("http://localhost:3001/employees?id=11");

      await Promise.all([reqEmployee1, reqEmployee2])
        .then(
          axios.spread((res1, res2) => {
            console.log("res1", res1);
            console.log("res2", res2);
          })
        )
        .catch((err) => {
          console.log("error", err);
          // throw err
        });

      console.log("End");
    } catch (error) {
      console.log("error2", error);
    }
  }; */

  // แบบใส่ config เข้าไปใน function เลย
  /* const getEmployees = () => {
    axios({
      method: "get",
      url: "http://localhost:3001/employees",
    })
      .then((res) => {
        setEmployeeList(res.data);
      })
      .catch((err) => {
        console.log("error: ", err);
      })
      .finally(() => {
        console.log("always executed");
      });
  }; */

  // แบบใช้ method ที่ทาง axios เตรียมไว้ให้
  const getEmployees = () => {
    axios.get("http://localhost:3001/employees").then((res) => {
      setEmployeeList(res.data);
    });
  };

  const getEmployeeById = () => {
    // แบบใส่ query params เข้าไปใน url
    axios.get(`http://localhost:3001/employees?id=${id}`).then((res) => {
      setEmployeeList(res.data);
    });

    // แบบใช้ options ใน axios
    /* const options = {
      params: {
        id: id,
      },
    };

    axios.get(`http://localhost:3001/employees`, options).then((res) => {
      setEmployeeList(res.data);
    }); */
  };

  const addEmployee = (event) => {
    /* event.preventDefault(); */

    // ส่งข้อมูลแบบ JSON ไปที่ Server
    /* const payload = {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }; */

    // ส่งข้อมูลแบบ application/x-www-form-urlencoded โดยใช้ฟังก์ชั่น URLSearchParams (ตัวนี้ไม่ได้รองรับทุก Browser นะ)
    // ตัวอย่าง: name=<name>&age=<age>&country=<country>&position=<position>&wage=<wage>
    /* const payload = new URLSearchParams({
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }); */

    // ส่งข้อมูลแบบ multipart/form-data โดยใช้ฟังก์ชั่น FormData
    // อยู่ในรูปของ content-disposition ซึ่งเป็น header ตัวนึงไว้ให้ browser download ไฟล์แทนที่จะเปิดใน browser
    /* const payload = new FormData();
    payload.append('name', name)
    payload.append('age', age)
    payload.append('country', country)
    payload.append('position', position)
    payload.append('wage', wage)
    console.log(payload); */

    /* axios.post("http://localhost:3001/create", payload).then(() => {
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
    }); */

    // ส่งข้อมูลแบบ multipart/form-data โดยให้ axios แปลง JSON เป็น FormData ให้อัตโนมัติ
    const payload = {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    };

    axios
      .post("http://localhost:3001/create", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
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
    // put หรือ patch ก็ได้ขึ้นอยู่กับว่า server ตั้งไว้เป็น method อะไร
    axios
      .put("http://localhost:3001/update", { wage: newWage, id: id })
      .then((res) => {
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
    axios.delete(`http://localhost:3001/delete/${id}`).then((res) => {
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
            <div className="employee card" key={key}>
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
