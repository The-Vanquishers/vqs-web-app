import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useNavigate } from "react-router-dom";
const { login } = require("./actions/login");

function App() {
  const [email, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(null);
  const Navigate = useNavigate();

  const onLiginClick = () => {
    if (!email || !pass) {
      setErr("Please provide credentials");
      return;
    }
    setErr(null);
    login(email, pass);
    // Navigate("/dashboard");l,
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <input
            type="text"
            placeholder="userName"
            value={email}
            onChange={({ target }) => setUserName(target.value)}
          />
          <br />
          UserName: {email}
          <br />
          <input
            type="password"
            placeholder="password"
            value={pass}
            onChange={({ target }) => setPass(target.value)}
          />
          <br />
          <span style={{ color: "#f13939" }}>{err}</span>
          <br />
          <button onClick={onLiginClick}>Login</button>
        </p>
      </header>
    </div>
  );
}

export default App;
