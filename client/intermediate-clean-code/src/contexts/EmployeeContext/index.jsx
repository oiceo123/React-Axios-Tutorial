import { useContext, createContext, useState } from "react";

const EmployeeContext = createContext();

export function useEmployeeContext() {
  return useContext(EmployeeContext);
}

export function EmployeeContextProvider({ children }) {
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  const updateId = (newId) => {
    setId(newId);
  };

  const updateName = (newName) => {
    setName(newName);
  };

  const updateAge = (newAge) => {
    setAge(newAge);
  };

  const updateCountry = (newCountry) => {
    setCountry(newCountry);
  };

  const updatePosition = (newPosition) => {
    setPosition(newPosition);
  };

  const updateWageForm = (newWage) => {
    setWage(newWage);
  };

  const updateWageButton = (newWage) => {
    setNewWage(newWage);
  };

  const updateEmployeeList = (newEmployeeList) => {
    setEmployeeList(newEmployeeList);
  };

  const sharedData = {
    id,
    name,
    age,
    country,
    position,
    wage,
    newWage,
    employeeList,
    updateId,
    updateName,
    updateAge,
    updateCountry,
    updatePosition,
    updateWageForm,
    updateWageButton,
    updateEmployeeList,
  };

  return (
    <EmployeeContext.Provider value={sharedData}>
      {children}
    </EmployeeContext.Provider>
  );
}
