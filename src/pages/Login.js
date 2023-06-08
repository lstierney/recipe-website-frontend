import React from 'react';
import LoginForm from "../components/LoginForm";
import {toastUtils} from "../utils/toast-utils";
import {redirect} from "react-router-dom";
import config from "../config";
import {EXPIRATION, saveAuthToken} from "../utils/auth";
import jwt_decode from 'jwt-decode';

const Login = () => {
    return (
        <LoginForm/>
    );
};

export default Login;

export const action = async ({request}) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');
    const toast = toastUtils();
    toast.loading("Submitting...");

    const postData = async () => {
        const response = await fetch(config.API_HOST + '/authenticate', {
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
        const decoded = jwt_decode(token);
        const expiration = new Date(decoded.exp * 1000);
        localStorage.setItem(EXPIRATION, expiration.toISOString());

        saveAuthToken(token);

        toast.success("Success");

        return redirect('/admin/');
    } catch (error) {
        toast.error(error.message);
        return redirect('/login/');
    }
}