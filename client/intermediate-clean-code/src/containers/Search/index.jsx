import React from "react";
import Search from "../../components/Search";
import { useEmployeeContext } from "../../contexts/EmployeeContext";
import axios from "../../api";

function SearchContainer() {
  const { id, updateId, updateEmployeeList } = useEmployeeContext();

  function getEmployeeById() {
    axios
      .get(`/employees?id=${id}`)
      .then((res) => {
        updateEmployeeList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Search
      classNameButton={"btn border border-black"}
      messageButton={"Search"}
      onChange={(event) => updateId(event.target.value)}
      onClick={getEmployeeById}
      placeholder={"Search ID"}
    />
  );
}

export default SearchContainer;
