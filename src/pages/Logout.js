import {removeAuthToken, removeExpiration} from "../utils/auth";

export const action = () => {
    removeAuthToken();
    removeExpiration();
}