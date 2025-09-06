import * as React from 'react';
import { useState } from 'react';
import * as PropTypes from 'prop-types';
import './LoginPage.module.css';
import {Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {addToken} from '../../state/jwtSlice.tsx'
import { useDispatch } from "react-redux";

const apiUrl = process.env.REACT_APP_SB_API_URL;

interface AuthResponse {
    token: string;
    createdAt: string;
    expiresAt: string;
}

async function loginUser(credentials) {
    console.log(JSON.stringify(credentials))
    console.log("apiUrl: ", apiUrl)
    return fetch(apiUrl + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function LoginPageWithSb({ setToken, setIsRegister }) {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async e => {
        e.preventDefault();
        console.log("start to submit login form")
        const response: AuthResponse = await loginUser({
            username,
            password
        });
        console.log("start to submit login form 2")
        if(!response.token) {
            console.log("token is empty ")
            setToken('');
        } else {
            const token = response.token;
            console.log("token: ", token)
            setToken(token);
            try {
                dispatch(addToken(token))
                console.log("added token to redux")
            } catch (e) {
                console.log("error in adding token to redux: ", e);
            }
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
            <h2>This is jwt login implementation with Spring boot</h2>
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

LoginPageWithSb.propTypes = {
    setToken: PropTypes.func.isRequired,
    setIsRegister: PropTypes.func.isRequired
};