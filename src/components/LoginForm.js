import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import {toastUtils} from "../utils/toast-utils";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const toast = toastUtils();
        toast.loading("Submitting...");

        const postData = async () => {
            const response = await fetch("http://localhost:8080/authenticate", {
                method: 'POST',
                body: JSON.stringify({'username': username, 'password': password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Submitting details failed');
            }
            return response;
        };

        try {
            const response = await postData();
            const token = await response.text();
            //const decodedToken = jwt_decode(token);

            localStorage.setItem('token', token);

            toast.success("Success");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
