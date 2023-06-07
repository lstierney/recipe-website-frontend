import React from 'react';
import {Form} from "react-router-dom";

const LoginForm = () => {
    return (
        <div>
            <h2>Login</h2>
            <Form method="post">
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        required/>
                </div>
                <button>Login</button>
            </Form>
        </div>
    );
};

export default LoginForm;
