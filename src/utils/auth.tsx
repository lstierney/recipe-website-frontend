import {redirect} from "react-router-dom";
import jwt_decode, {JwtPayload} from "jwt-decode";
import _ from 'lodash';

export const EXPIRED = 'EXPIRED';
const TOKEN = 'token';
const EXPIRATION = 'expiration';
const SUB = 'sub';
const IS_EDITING = 'isEditing';

export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem(EXPIRATION);
    if (storedExpirationDate !== null) {
        const expirationDate = new Date(storedExpirationDate);
        const now = new Date();
        return expirationDate.getTime() - now.getTime();
    }
}

export const getAuthToken = () => {
    const token = localStorage.getItem(TOKEN);

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration === undefined || tokenDuration < 0) {
        return EXPIRED;
    }
    return token;
}

export const isAdminUser = (): boolean => {
    const token: null | string = getAuthToken();

    return !_.isNil(token) && token !== EXPIRED;
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

export const handleLogin = (token: string) => {
    const decoded: JwtPayload = jwt_decode(token);
    if (decoded.exp !== undefined) {
        const expiration = new Date(decoded.exp * 1000);

        localStorage.setItem(EXPIRATION, expiration.toISOString());

        if (decoded.sub !== undefined) {
            localStorage.setItem(SUB, decoded.sub);
        }
        localStorage.setItem(TOKEN, token);
    }
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

export const isInEditingMode = (): boolean => {
    return !_.isNil(localStorage.getItem(IS_EDITING)) && isAdminUser();
}

