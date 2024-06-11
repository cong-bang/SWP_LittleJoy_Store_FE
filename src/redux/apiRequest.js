import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "./authSlice";

export const loginUser = async(user,dispatch,navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://littlejoyapi.azurewebsites.net/api/authen/login", user);
        dispatch(loginSuccess((await res).data));
        navigate("/");
    } catch(err) {
        dispatch(loginFailed());
    }
}