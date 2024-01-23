import {url as api_url} from "../Constants";
import {fetchToken} from "../Auth";
import axios from "axios";

function errorHandler(error) {
    throw new Error('ERROR: ' + error);
}

export const setUser = async () => {
    const user = await getUserFromApi();
    localStorage.setItem('user', JSON.stringify(user))
}

export const getAllUser = () => {
    try {
        return getAllUserFromApi();
    } catch (error) {
        errorHandler(error);
    }

}

export const getUser = () => {
    return JSON.parse(localStorage.getItem('user')) || null
}

export const removeUser = () => {
    localStorage.removeItem('user');
}

const getUserFromApi = async () => {

    let url = api_url + 'users/me';
    let token = fetchToken();
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    try {
        // use data destructuring to get data from the promise object
        const {data: response} = await axios.get(url, options);
        return response; // <- promise
    } catch (error) {
        throw new Error(error);
    }

}

const getAllUserFromApi = async () => {

    let url = api_url + 'user/all';
    let token = fetchToken();
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    try {
        const {data: response} = await axios.get(url, options);
        return response;
    } catch (error) {
        throw new Error(error);
    }

}

export const isSuperUser = () => {
    const user = getUser();

    return user.is_superuser === true;

}