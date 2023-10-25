import React, { useEffect } from "react";
import { EmployeeContextProvider } from "./contexts/EmployeeContext";
import { HealthCheckProvider } from "./contexts/HealthCheckContext";
import Employee from "./pages/Employee";

function App() {
  useEffect(() => {
    localStorage.setItem("token", "tokenUser001");
  }, []);

  return (
    <EmployeeContextProvider>
      <HealthCheckProvider>
        <Employee />
      </HealthCheckProvider>
    </EmployeeContextProvider>
  );
}

export default App;
