import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { signupReducer } from './../reducers/signup';
const { signup } = require("../actions/signup");

function Signup(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const Navigate = useNavigate();

    useEffect(() => {
        if (props.signup.isSignedUp) {
            Navigate("/");
            return;
        }
        if (props.signup.signupFailed) {
            setErr(props.signup.errMsg);
            return;
        }
    }, [Navigate, props.signup]);


    const onSignupBtnClick = () => {
        if (!name || !email || !password) {
            setErr("Please provide credentials");
            return;
        }
        setErr(null);
        setLoading(true);
        props.dispatch(signup(name,email, password));
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="title">SIGNUP</div>

                <br />
                <Input
                    onChange={e => {
                        setName(e.target.value);
                        setLoading(false);
                    }}
                    value={name}
                    label="Name"
                    placeholder="Full Name"
                />
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
                <div className="login-btn-container">
                    <Button
                        text="Signup"
                        color="primary"
                        onClick={onSignupBtnClick}
                        loading={loading}
                    />
                     <Button
                        text="Already have an Account!"
                        color="error"
                        variant="outlined"
                        onClick={()=>Navigate("/")}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        signup: signupReducer(state)
    };
};
export default connect(mapStateToProps)(Signup);
