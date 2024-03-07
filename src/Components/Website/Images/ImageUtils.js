import ImageItem from "../List/ImageItem";
import React from "react";
import {url as api_url} from "../Constants";
import {fetchToken} from "../Auth";
import axios from "axios";

class ImageUtils {

    static errorHandler = (error) => {
        if ("ERR_BAD_REQUEST" === error.code) {
            // window.location.href = '/login';
        } else {
            console.log('Error: ', error);
        }
    }

    static getAllImages = () => {
        try {
            return this.getAllImagesFromApi();
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static getOrderImages = (orderId) => {
        try {
            return this.getOrderImagesFromApi(orderId);
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static getOrderImagesFromApi = async (orderId) => {

        let url = api_url + 'order/images/' + orderId;
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
            this.errorHandler(error);
        }
    }

    static getAllImagesFromApi = async () => {

        let url = api_url + 'images/all';
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
            this.errorHandler(error);
        }
    }

    static prepareImageDataNew = (images, name) => {
        let imageData = [];
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const fileTypeParts = image.type.split('/');
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.onload = () => {
                imageData[i] = {
                    name: ('' !== name) ? name + '_' + i + '.' + fileTypeParts.pop() : image.name,
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

    static createImageListBlock = (imageData) => {
        return <div className="w-full grid md:grid-cols-3 md:gap-3 sm:grid-cols-1 sm:gap-1">
            {
                imageData.map((data, key) => {
                    let elementList = '';
                    // eslint-disable-next-line array-callback-return
                    Object.keys(data).map(() => {
                        elementList = <ImageItem
                            id={data.id}
                            key={key}
                            image={data}
                            selectedImagesCustomer=''
                            orderId=''
                            ordered=''
                            onChangePlus=''
                            onChangeMinus=''
                        />
                    });
                    return elementList;
                })
            }
        </div>
    }

    static addImageToOrder = async (orderId, imageId) => {
        let url = api_url + 'image/assign/order';
        let token = fetchToken();
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        const imageOrderData = {
            order_id: orderId,
            image_id: imageId
        }

        try {
            const {data: response} = await axios.post(url, imageOrderData, options);
        } catch (error) {
            this.errorHandler(error);
        }
    }

}

export default ImageUtils;