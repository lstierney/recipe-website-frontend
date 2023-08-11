import {redirect} from "react-router-dom";
import jwt_decode from "jwt-decode";
import _ from 'lodash';

export const EXPIRED = 'EXPIRED';
const TOKEN = 'token';
const EXPIRATION = 'expiration';
const SUB = 'sub';
const IS_EDITING = 'isEditing';

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

export const isAdminUser = () => {
    const token = getAuthToken();
    return token && token !== EXPIRED;
}

export const tokenLoader = () => {
    return getAuthToken();
}

export const checkAuthLoader = () => {
    const token = getAuthToken();

    if (!token || token === EXPIRED) {
        return redirect('/login');
    }
    return null;
}

export const handleLogin = (token) => {
    const decoded = jwt_decode(token);
    const expiration = new Date(decoded.exp * 1000);

    localStorage.setItem(EXPIRATION, expiration.toISOString());
    localStorage.setItem(SUB, decoded.sub);
    localStorage.setItem(TOKEN, token);
}

export const handleLogout = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(EXPIRATION);
    localStorage.removeItem(SUB);
    leaveEditingMode();
}

export const getSubject = () => {
    return localStorage.getItem(SUB);
}

export const enterEditingMode = () => {
    localStorage.setItem(IS_EDITING, 'true');
}

export const leaveEditingMode = () => {
    localStorage.removeItem(IS_EDITING);
}

export const isInEditingMode = () => {
    return !_.isEmpty(localStorage.getItem(IS_EDITING)) && isAdminUser();
}

