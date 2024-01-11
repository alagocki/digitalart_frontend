import {url as api_url} from "../Constants";
import {fetchToken} from "../Auth";
import axios from "axios";

function errorHandler() {
    // console.error('error');
}

export const setUser = async () => {
    const user = getUserFromApi();

    getUserFromApi()
        .then(() => user)
        .then(data => localStorage.setItem('user', JSON.stringify(data)))// rest of script
        .catch(errorHandler);
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
        // console.log(error);
    }

}

export const isSuperUser = () => {
    const user = getUser();

    return user.is_superuser === true;

}