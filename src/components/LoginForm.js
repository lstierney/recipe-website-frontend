import React from 'react';
import {Form} from "react-router-dom";
import classes from './LoginForm.module.css';
import Button from "./button/Button";

const LoginForm = () => {
    return (
        <section>
            <h1>Login</h1>
            <Form method="post" className={classes['login-form']}>
                <div>
                    <label>Username</label>
                </div>
                <div>
                    <input
                        type="text"
                        name="username"
                        required/>
                </div>
                <div>
                    <label>Password</label>
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        required/>
                </div>
                <div>
                    <Button>Login</Button>
                </div>
            </Form>
        </section>
    );
};

export default LoginForm;
