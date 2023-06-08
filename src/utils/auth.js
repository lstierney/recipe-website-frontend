import {redirect} from "react-router-dom";

const TOKEN = 'token';

export const getAuthToken = () => {
    return localStorage.getItem(TOKEN);
}

export const saveAuthToken = (token) => {
    localStorage.setItem(TOKEN, token);
}

export const removeAuthToken = () => {
    localStorage.removeItem(TOKEN)
}

export const tokenLoader = () => {
    return getAuthToken();
}

export const checkAuthLoader = () => {
    const token = getAuthToken();

    if (!token) {
        return redirect('/login');
    }
    return null;
}

