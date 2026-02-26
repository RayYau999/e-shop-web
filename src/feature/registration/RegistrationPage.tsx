import React, {useState} from 'react';
import {Credentials, RegisterCredentials} from "../type/EShopCommonTypes";
export default function RegistrationPage() {

    const apiUrl = process.env.REACT_APP_DJ_API_URL;

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [userExists, setUserExists] = useState(false);
    const [success, setSuccess] = useState(false);
    const registerUser = async (credentials: Credentials) => {
        console.log(JSON.stringify(credentials))
        console.log("apiUrl: ", apiUrl)
        return fetch(apiUrl + '/loginapi/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const registerCredentials: RegisterCredentials = {
            username,
            password,
            email
        };

        const response = await registerUser(registerCredentials);
        console.log("response: ", response)
        console.log("response status: ", response.status)
        if (response.status === 201) {
            console.log("response message: ", response.message)
            if (response.message === "User created successfully") {
                console.log("set user exists to true")
                setSuccess(true);
                setUserExists(false);
            }
        } else if (response.username[0] === "A user with that username already exists.") {
            console.log("set user exists to true")
            setUserExists(true);
            setSuccess(false);
        }


        // else if (response.message === "User created successfully") {
        //     console.log("set success to true")
        //     setSuccess(true);
        // }

    }


    return (
        <>
            {userExists && <div>User already exists</div>}
            {success && <div>Success</div>}
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
                    <label>
                        <p>Email</p>
                        <input type="email" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}