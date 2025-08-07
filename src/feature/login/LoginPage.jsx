import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginPage.module.css';
import {Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RegistrationPage from "../registration/RegistrationPage";

const apiUrl = process.env.REACT_APP_DJ_API_URL;

async function loginUser(credentials) {
    console.log(JSON.stringify(credentials))
    console.log("apiUrl: ", apiUrl)
    return fetch(apiUrl + '/loginapi/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken, setIsRegister }) {
    const navigate = useNavigate();

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });
        if(!response.token) {
            console.log("token is empty ")
            setToken('');
        } else {
            const token = response.token;
            console.log("token: ", token)
            setToken(token);
        }

    }

    const bypassLogin = () => {
        setToken("something");
    }

    const handleRegistration = () =>{
        console.log("set is regis to true")
        setIsRegister(true);
    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <Button onClick={handleRegistration}>Register</Button>
            <Button onClick={bypassLogin}>Bypass login button</Button>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setIsRegister: PropTypes.func.isRequired
};