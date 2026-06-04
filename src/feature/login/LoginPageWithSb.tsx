import * as React from 'react';
import { useState } from 'react';
import * as PropTypes from 'prop-types';
import styles from './LoginPage.module.css';
import { addToken } from '../../state/jwtSlice'
import { useDispatch } from "react-redux";
import { Credentials, EShopCommonFetchProps } from "../type/EShopCommonTypes";
import { fetchEShopData } from "../common/EShopCommonFetch";
import { APP_CONFIG } from "../../config/appConfig";

const apiUrl = APP_CONFIG.SB_API_URL;

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
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>KT</div>
                    <h1 className={styles.title}>Welcome back</h1>
                    <p className={styles.subtitle}>Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label}>Username</label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Enter your username"
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Password</label>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Enter your password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className={styles.submitButton} type="submit">Sign In</button>
                </form>

                <div className={styles.divider}>
                    <span className={styles.dividerLine} />
                    <span className={styles.dividerText}>or</span>
                    <span className={styles.dividerLine} />
                </div>

                <div className={styles.secondaryActions}>
                    <button className={styles.secondaryButton} onClick={handleRegistration}>
                        Create New Account
                    </button>
                    <button className={styles.bypassButton} onClick={bypassLogin}>
                        Continue as Guest
                    </button>
                </div>

                <p className={styles.footer}>This is JWT login with Spring Boot backend</p>
            </div>
        </div>
    )
}

LoginPageWithSb.propTypes = {
    setToken: PropTypes.func.isRequired,
    setIsRegister: PropTypes.func.isRequired
};
