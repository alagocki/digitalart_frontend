import {useLocation, Navigate} from "react-router-dom";

export const setToken = (token) => {
    localStorage.setItem("hpknzAfSPmfI8AAI", token);
}

export const fetchToken = (token) => {
    return localStorage.getItem("hpknzAfSPmfI8AAI") || null;
}

export function RequireToken({children}) {
    const location =  useLocation();
    const auth = fetchToken();

    if (!auth) {
        return <Navigate to="/login" state={{from : location}} />;
    }
    return children;
}