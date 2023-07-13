import React from "react";
import ToDo from "./component/ToDo";
import About from "./component/About";
import NavBar from "./component/NavBar";
import Alert from "./component/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [alert, setAlert] = React.useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <Router>
      <NavBar />
      <Alert alert={alert} />
      <Routes>
        <Route path="/" element={<ToDo showAlert={showAlert} />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
