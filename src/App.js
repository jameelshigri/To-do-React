import ToDo from "./component/ToDo";
import Alert from "./component/Alert";
import React from "react";

function App() {
  const [alert, setAlert] = React.useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <div className="App">
      <Alert alert={alert} />
      <ToDo showAlert={showAlert} />
    </div>
  );
}

export default App;
