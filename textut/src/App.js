import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import React, { useState } from "react";
import Alert from "./components/Alert";
function App() {
  const [alert, setAlert] = useState("");
  const [mode, setMode] = useState(`light`);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = (cls) => {
    if (mode === "light" || mode === "green" || mode === "red") {
      setMode(`dark`);
      document.body.style.backgroundColor = "grey";
      showAlert("Dark mode has enabled", "success");
      document.title = "Textutils | Dark mode";
    } else {
      setMode(`light`);
      document.body.style.backgroundColor = "white";
      showAlert("light mode has enabled", "success");
    }
  };

  const switchRedMode = () => {
    if (mode === "light" || mode === "green" || mode === "dark") {
      setMode(`red`);
      document.body.style.backgroundColor = "red";
      showAlert("red mode has enabled", "success");
      document.title = "TextUtils | Red mode";
    } else {
      setMode(`light`);
      document.body.style.backgroundColor = "white";
      showAlert("light mode has enabled", "success");
    }
  };

  const switchGreenMode = () => {
    if (mode === "light" || mode === "red" || mode === "dark") {
      setMode(`green`);
      document.body.style.backgroundColor = "green";
      showAlert("green mode has enabled", "success");
      document.title = "TextUtils | green Mode";
    } else {
      setMode(`light`);
      document.body.style.backgroundColor = "white";
      showAlert("light mode has enabled", "success");
    }
  };

  return (
    <>
      {/* <Router> */}
      <Navbar
        title="TextUtils"
        mode={mode}
        toggleMode={toggleMode}
        switchRedMode={switchRedMode}
        switchGreenMode={switchGreenMode}
      />
      <About mode={mode} />
      <Alert alert={alert} />
      <TextForm />
      {/* <div className="container my-3">
        <Routes>
          <Route exact path="/about" element={<About mode={mode} />}></Route>
          <Route exact path="/" element={<TextForm />}></Route>
        </Routes>
      </div> */}
      {/* </Router> */}
    </>
  );
}

export default App;
