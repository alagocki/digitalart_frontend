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

        // console.log(response);

        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const getOrderById = (id) => {
    try {
        return getOrderFromApiById(id);
    } catch (error) {
        errorHandler(error);
    }
}

const getOrderFromApiById = async (id) => {

    let token = fetchToken();
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    try {
        const url = api_url + 'order/' + id;
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
        Object.keys(data).map(async (key) => {
            let date = new Date(data[key]['shooting_date']);
            let pld = {
                id: data[key]['id'],
                headlineCardHeader: data[key]['topic'] + ' - ' + date.toLocaleDateString('de-DE'),
                headline2: 'Order: ' + data[key]['order_number'],
                headline1: data[key]['lastname'] + ', ' + data[key]['forename'],
                info1: data[key]['info'],
                info2: data[key]['status'],
                info3: (data[key]['images_cnt'] > 0) ? data[key]['images_cnt'] + ' Media Files created' : '',
            }
            preparedlistData.push(pld);
        });
    });
    return preparedlistData;
}

export const prepareImageData = (images) => {

    let imageData = [];
    for (let i = 0; i < images.length; i++) {

        const image = images[i];

        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);

        fileReader.onload = () => {
            imageData[i] = {
                name: image.name,
                description: 'Bild ' + i,
                status: 'unbearbeitet',
                ordered: false,
                base64encoded: fileReader.result
            }
        };

        fileReader.onerror = (error) => {
            console.log('Error: ', error);
        };

    }

    return imageData
}
