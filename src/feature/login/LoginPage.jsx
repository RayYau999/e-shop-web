import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginPage.module.css';
import {Button} from "react-bootstrap";

async function loginUser(credentials) {
    console.log(JSON.stringify(credentials))
    return fetch('http://127.0.0.1:8000/loginapi/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {
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
            <Button onClick={bypassLogin}>Bypass login button</Button>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};