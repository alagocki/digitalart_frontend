import React, {useEffect, useState} from "react";
import BackendHeader from "../../website/backend/BackendHeader";
import SubnaviOrderBackend from "../../website/backend/SubnaviOrderBackend";
import {getAllOrder} from "../../website/Order/Order";
import ListItemOrder from "../../website/List/ListItemOrder";
import {Navigate} from "react-router-dom";


const BackendOrderList = () => {

    const [orderData, setOrder] = useState([]);
    const [loading, setLoading] = useState({
        loading: true,
    });

    const fetchOrderData = () => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    if (loading) {
                        const response = await getAllOrder();
                        // if(response.status === 401){
                        //     Navigate = '/login';
                        // }
                        setOrder(response.orders);
                        setLoading(false);
                    }

                } catch (error) {
                    console.error(error);
                }
            };
            fetchUsers().then();
        });

        return (
            <div className="grid grid-cols-2 gap-2">
                {
                    orderData.map((order) => {
                        let elementList = '';
                        // eslint-disable-next-line array-callback-return
                        Object.keys(order).map((key) => {
                            elementList = <ListItemOrder
                                key={order[key]['id']}
                                id={order[key]['id']}
                                forename={order[key]['forename']}
                                lastname={order[key]['lastname']}
                                topic={order[key]['topic']}
                                info={order[key]['info']}
                                status={order[key]['status']}
                            />
                        });
                        return elementList;
                    })}
            </div>);
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