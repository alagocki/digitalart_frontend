import React from 'react';
import Header_Pic from '../Images/header_backend.png';
import TopnaviBackend from "./TopnaviBackend";
import {isTokenValid} from "../Auth";

const BackendHeader = () => {

    isTokenValid();

    return (
        <section>
            <h2 className="font-semibold tracking-tight text-center text-gray-700">
                <picture>
                    <img className="inset-0 object-cover object-center"
                         src={Header_Pic}
                         alt="" loading=""/>
                </picture>
            </h2>
            <div className="text-sm text-gray-700 text-right border-t-gray-180 border-b-gray-180 border-b-2">
                {<TopnaviBackend />}
            </div>
        </section>
    );

}

export default BackendHeader;