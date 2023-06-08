import {redirect} from "react-router-dom";

const TOKEN = 'token';
export const EXPIRATION = 'expiration';
export const EXPIRED = 'EXPIRED';

export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem(EXPIRATION);
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    return expirationDate.getTime() - now.getTime();
}

export const getAuthToken = () => {
    const token = localStorage.getItem(TOKEN);

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return EXPIRED;
    }
    return token;
}

export const saveAuthToken = (token) => {
    localStorage.setItem(TOKEN, token);
}

export const removeAuthToken = () => {
    localStorage.removeItem(TOKEN)
}

export const removeExpiration = () => {
    localStorage.removeItem(EXPIRATION)
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

