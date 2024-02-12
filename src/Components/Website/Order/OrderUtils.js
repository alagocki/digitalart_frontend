import {url as api_url} from "../Constants";
import {fetchToken} from "../Auth";
import axios from "axios";

class OrderUtils {

    static errorHandler = (error) => {
        if ("ERR_BAD_REQUEST" === error.code) {
            window.location.href = '/login';
        } else {
            console.log('Error: ', error);
        }
    }

    static getAllOrder = () => {
        try {
            return this.getAllOrderFromApi();
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static getAllOrderFromApi = async () => {

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
            this.errorHandler(error);
        }
    }

    static getOrderById = (id) => {
        try {
            return this.getOrderFromApiById(id);
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static getOrderFromApiById = async (id) => {

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
            this.errorHandler(error);
        }

    }

    static prepareDataOrder = (res) => {
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

    static prepareImageDataNew = (images) => {
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
                    base64encoded: fileReader.result,
                    blocked: false
                }
            };
            fileReader.onerror = (error) => {
                console.log('Error: ', error);
            };
        }
        return imageData
    }

    static prepareImageDataStock = (images) => {
        let imageData = [];
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            imageData[i] = {
                name: image[0].name,
                description: image[0].description,
                status: image[0].status,
                ordered: image[0].ordered,
                base64encoded: image[0].base64encoded,
                blocked: image[0].blocked
            }
        }
        return imageData
    }

    static orderDataForApi = (state, type, imageData) => {
        try {
            const img_cnt = imageData.length
            return {
                topic: ('insert' === type) ? state.valueTopic : '-',
                info: ('insert' === type) ? state.valueInfo : '-',
                order_number: ('insert' === type) ? Math.floor(Math.random() * 100000) : 99999,
                shooting_date: ('insert' === type) ? state.valueShootingDate : state.orderData.shooting_date, //'2024-01-08 07:38:04.844915',
                status: ('insert' === type) ? ('' !== state.valueStatus) ? state.valueStatus : 'offen' : 'offen',
                customer_id: ('insert' === type) ? state.valueCustomer : '-',
                basic_price: ('insert' === type) ? Number(state.valuePrice) : 0,
                additional_pic_price: ('insert' === type) ? Number(state.valueAddPicPrice) : 0,
                condition: ('insert' === type) ? state.valueConditions : '-',
                images_cnt: img_cnt,
                include_media: ('insert' === type) ? state.valueIncludeMedia : 0,
                selected_images_by_customer: (state.selectedImagesCustomer) ? state.selectedImagesCustomer : 0,
                images: imageData
            };
        } catch (error) {
            this.errorHandler(error);
            return null;
        }
    }

    static getOrderedImages = (imageData) => {
        let orderedImages = 0;
        // eslint-disable-next-line array-callback-return
        imageData.map((data, key) => {
            // eslint-disable-next-line array-callback-return
            Object.keys(data).map(() => {
                if (data[0].ordered === true) {
                    orderedImages += 1;
                }
            });
        })

        return orderedImages;
    }

}

export default OrderUtils;