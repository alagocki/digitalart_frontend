import React, {useState} from "react";
import BackendHeader from "../../website/backend/BackendHeader";
import SubnaviOrderBackend from "../../website/backend/SubnaviOrderBackend";


const BackendOrderList = () => {


    const fetchOrderData = () => {

        return (
            <div className="grid grid-cols-2 gap-2">
                List will be here
            </div>
        );

    };

    return (
        <main className="pt-20">
            <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                {<BackendHeader/>}
                {<SubnaviOrderBackend/>}

                <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                    Order List
                </h1>
                {fetchOrderData()}
            </div>
        </main>
    );

}


export default BackendOrderList;