import {url as api_url} from "../Constants";
import {fetchToken} from "../Auth";
import axios from "axios";

function errorHandler(error) {
    console.error(error);
    throw new Error('ERROR: ' + error);
}

export const getAllOrder = () => {
    try {
        return getAllOrderFromApi();
    } catch (error) {
        errorHandler(error);
    }

}

const getAllOrderFromApi = async () => {

    let url = api_url + 'order/all';
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