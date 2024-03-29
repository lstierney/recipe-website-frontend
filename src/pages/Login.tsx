import React from 'react';
import LoginForm from "../components/loginform/LoginForm";
import {toastUtils} from "../utils/toast-utils";
import {redirect} from "react-router-dom";
import {handleLogin} from "../utils/auth";
import type {ActionFunction} from "react-router";

const Login = () => {
    return (
        <LoginForm/>
    );
};

export default Login;

export const action: ActionFunction = async ({request}) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');
    const toast = toastUtils();
    toast.loading("Submitting...");

    const postData = async () => {
        const response = await fetch(process.env.REACT_APP_API_HOST + '/authenticate', {
            method: 'POST',
            body: JSON.stringify({'username': username, 'password': password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        return response;
    };

    try {
        const response = await postData();
        const token = await response.text();

        handleLogin(token);

        toast.success("Success");

        return redirect('/admin/');
    } catch (error: any) {
        toast.error(error.message);
        return redirect('/login/');
    }
}