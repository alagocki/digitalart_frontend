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

export const prepareDataOrder = (res) => {
    let preparedlistData = [];
    // eslint-disable-next-line array-callback-return
    res.map((data) => {
        // eslint-disable-next-line array-callback-return
        Object.keys(data).map((key) => {
            let date = new Date(data[key]['shooting_date']);
            let pld = {
                id: data[key]['id'],
                headlineCardHeader: data[key]['topic'] + ' - ' + date.toLocaleDateString('de-DE'),
                headline2: 'Order: ' + data[key]['order_number'],
                headline1: data[key]['lastname'] + ', ' + data[key]['forename'],
                info1: data[key]['info'],
                info2: data[key]['status'],
                info3: data[key]['image_count'] + ' Images',
            }
            preparedlistData.push(pld);
        });
    });
    return preparedlistData;
}
