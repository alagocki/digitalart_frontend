import React, {useEffect, useState} from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import SubnaviBackendStandard from "../../Website/Backend/SubnaviBackendStandard";
import {url as api_url} from "../../Website/Constants";
import {fetchToken} from "../../Website/Auth";
import axios from "axios";
import ImageItem from "../../Website/List/ImageItem";


const BackendOrderDetail = () => {

    const [orderData, setOrder] = useState([]);
    const [imageData, setImages] = useState([]);

    const getOrderId = () => {
        const queryParameters = new URLSearchParams(window.location.search)
        return queryParameters.get("order")
    }

    const getData = async () => {

        let token = fetchToken();
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        try {
            const url = api_url + 'order/' + getOrderId();
            const {data: response} = await axios.get(url, options);
            setOrder(response.order[0]);
            setImages(response.order[1]);
        } catch (error) {
            throw new Error(error);
        }
    }

    const fetchOrderData = () => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchImages = async () => {
                try {
                    await getData();
                } catch (error) {
                    console.error(error);
                }
            };
            fetchImages();
        }, []);

        return (
            <main className="pt-20">
                <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                    {<BackendHeader/>}
                    {<SubnaviBackendStandard type={'order'}/>}

                    <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                        Order Detail
                    </h1>
                    <div className="flex justify-center">
                        {(orderData.order_number) ?
                            <div className="mt-4 border m-3 border-white rounded-b-lg rounded-t-lg shadow-xl w-full">
                                <div className="">
                                    <div
                                        className="text-blue-700 text-xl mb-2 bg-gray-300 px-6 py-4 flex justify-between rounded-t-lg border">
                                        <div className="text-gray-400">Order {orderData.order_number}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="px-6 py-4">
                                            <h3 className="text-3xl font-bold text-amber-950">
                                                {orderData.lastname},<br/> {orderData.forename}
                                            </h3>
                                            <p className="text-gray-700 text-base">
                                                {orderData.topic}<br/>
                                                {orderData.info}<br/>
                                                {orderData.shooting_date}<br/>
                                            </p>
                                        </div>
                                        <div className="w-2/3 grid grid-cols-2 gap-2">
                                            {
                                                imageData.map((data, key) => {
                                                    let elementList = '';
                                                    // eslint-disable-next-line array-callback-return
                                                    Object.keys(data).map(() => {
                                                        elementList = <ImageItem
                                                            id={data[0].id}
                                                            key={key}
                                                            image={data[0]}
                                                        />
                                                    });
                                                    return elementList;
                                                })}
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                <span
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                </div>
                            </div> : <div className="text-gray-400">Data will be loaded</div>}


                    </div>
                </div>
            </main>
        );

    };

    return (
        <div>{fetchOrderData()}</div>
    );

}

export default BackendOrderDetail;
