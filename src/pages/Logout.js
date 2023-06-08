import {redirect} from "react-router-dom";
import {removeAuthToken} from "../utils/auth";

export const action = () => {
    removeAuthToken();
    return redirect('/');
}