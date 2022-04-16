import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import Button from "../Components/Button";
const { login } = require("../actions/login");
const { loginReducer } = require("../reducers/login");


function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    if (props.login.isLoggedIn) {
      Navigate("/empire");
      return;
    }
    if (props.login.loginFailed) {
      console.log(props.login);
      setErr(props.login.errMsg);
      return;
    }
  }, [props.login, Navigate]);

  const onLoginBtnClick = () => {
    if (!email || !password) {
      setErr("Please provide credentials");
      return;
    }
    setErr(null);
    setLoading(true);
    props.dispatch(login(email, password));
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="title">Login</div>
        <br />
        <Input
          onChange={e => {
            setEmail(e.target.value);
            setLoading(false);
          }}
          value={email}
          label="Email Address"
          placeholder="Email"
        />
        <br />
        <Input
          onChange={e => {
            setPassword(e.target.value);
            setLoading(false);
          }}
          value={password}
          type="password"
          label="Password"
          placeholder="Password"
        />
        <br />
        <p>{err}</p>
        <Button
          text="Login"
          color="success"
          onClick={onLoginBtnClick}
          loading={loading}
        />
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    login: loginReducer(state)
  };
};
export default connect(mapStateToProps)(Login);
