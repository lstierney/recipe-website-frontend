import {handleLogout} from "../utils/auth";
import {redirect} from "react-router-dom";

export const action = () => {
    handleLogout();
    return redirect('/');
}