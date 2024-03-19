import React from 'react';
import UploadPic from '../ImagesFiles/header_backend.png';
import {isTokenValid} from "../Auth";
import TopnaviBackendAdmin from "./TopnaviBackendAdmin";

const BackendHeader = () => {

    isTokenValid();

    return (
        <section>
            <h2 className="font-semibold tracking-tight text-center text-gray-700">
                <picture>
                    <img className="w-auto inset-0 object-cover object-center"
                         src={UploadPic}
                         alt="" loading=""/>
                </picture>
            </h2>
            <div className="text-sm text-gray-700 text-right border-t-gray-180 border-b-gray-180 border-b-2">
                {<TopnaviBackendAdmin/>}
            </div>
        </section>
    );

}

export default BackendHeader;