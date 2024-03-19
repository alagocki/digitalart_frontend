import React, {useEffect, useState} from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import {url as api_url} from "../../Website/Constants";
import axios from "axios";
import ImageUtils from "../../Website/Images/ImageUtils";

const BackendListImages = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [imageData, setImages] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const url = api_url + "images/all";
                const response = await axios.get(url);
                if (response.status === 200) {
                    setImages(response.data.images);
                } else {
                    console.error('ERROR: ' + response.status);
                }

            } catch (error) {
                console.error(error);
            }
        };
        fetchImages().then();
    }, []);

    return (
        <main className="p-20">
            <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                {<BackendHeader/>}

                <div className="flex justify-between">
                    <h1 className="mb-10 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3x">
                        Image List - Admin
                    </h1>
                </div>
                {ImageUtils.createImageListBlock(imageData)}
                
            </div>
        </main>
    );
}


export default BackendListImages;