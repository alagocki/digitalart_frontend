import {useLocation, Navigate} from "react-router-dom";

export const setToken = (token) => {
    localStorage.setItem("hpknzAfSPmfI8AAI", token);
    localStorage.setItem("setToken", Date.now());
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

export function isTokenValid() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location =  useLocation();
    let setToken = localStorage.getItem("setToken") || null;

    //darf nicht älter als 2 Stunden (7200000 Millisekunden) sein
    let currentTime = Date.now();
    if (!setToken || (currentTime - setToken) > 7200000) {
        localStorage.removeItem("hpknzAfSPmfI8AAI");
        return <Navigate to="/" state={{from : location}} />;
    }
}

export const removeToken = () => {
    localStorage.removeItem('hpknzAfSPmfI8AAI');
    localStorage.removeItem('setToken');
}