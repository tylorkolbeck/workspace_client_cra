import { useEffect } from "react";
import "./App.scss";
import useRouteObj from "./useRouteObj";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.component";
import { initiateSocketConnection } from "./socketio.service.js";
import useAuth from "./common/hooks/useAuth";

function App() {
  const routeElement = useRouteObj();
  const { loading } = useAuth();

  useEffect(() => {
    initiateSocketConnection();
  }, []);

  if (loading) {
    return <LoadingSpinner msg={"Loading your workspace"} />;
  }

  return <div className="App">{routeElement}</div>;
}

export default App;
