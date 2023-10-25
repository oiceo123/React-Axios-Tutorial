import { useContext, createContext, useState } from "react";

const HealthCheckContext = createContext();

export function useHealthCheckContext() {
  return useContext(HealthCheckContext);
}

export function HealthCheckProvider({ children }) {
  const [version, setVersion] = useState("");

  const updateVersion = (newVersion) => {
    setVersion(newVersion);
  };

  const sharedData = {
    version,
    updateVersion,
  };

  return (
    <HealthCheckContext.Provider value={sharedData}>
      {children}
    </HealthCheckContext.Provider>
  );
}
