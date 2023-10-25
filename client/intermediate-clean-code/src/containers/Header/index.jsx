import Header from "../../components/Header";
import axios from "../../api";
import { useHealthCheckContext } from "../../contexts/HealthCheckContext";
import { useEffect } from "react";

function HeaderContainer() {
  const title = "Employee Information";
  const { version, updateVersion } = useHealthCheckContext();

  function getHealthCheck() {
    axios
      .get("/health-check")
      .then((res) => {
        updateVersion(res.data.version);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getHealthCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Header title={title} version={version} />;
}

export default HeaderContainer;
