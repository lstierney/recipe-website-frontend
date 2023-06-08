import {redirect} from "react-router-dom";
import {removeAuthToken, removeExpiration} from "../utils/auth";

export const action = () => {
    removeAuthToken();
    removeExpiration();
    return redirect('/');
}