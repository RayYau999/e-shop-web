import * as React from 'react';
import { useState } from 'react';
import * as PropTypes from 'prop-types';
import './LoginPage.module.css';
import { Button } from "react-bootstrap";
import { addToken } from '../../state/jwtSlice'
import { useDispatch } from "react-redux";
import { Credentials, EShopCommonFetchProps } from "../type/EShopCommonTypes";
import { fetchEShopData } from "../common/EShopCommonFetch";

const apiUrl = process.env.REACT_APP_SB_API_URL;

interface AuthResponse {
    token: string;
    createdAt: string;
    expiresAt: string;
}

type LoginPageWithSbProps = {
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

type ApiResult = { response: Response; data: AuthResponse };

export default function LoginPageWithSb({ setToken, setIsRegister }: LoginPageWithSbProps) {
    const dispatch = useDispatch()

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function loginUser(credentials: Credentials) {
        console.log(JSON.stringify(credentials))
        console.log("apiUrl: ", apiUrl)

        const reqData: EShopCommonFetchProps = {
            path: apiUrl + '/login',
            method: 'POST',
            body: credentials
        }
        const apiResult: ApiResult = await fetchEShopData(reqData);

        return apiResult.data;
    }

    const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
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