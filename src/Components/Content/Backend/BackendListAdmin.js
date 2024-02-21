import React, {useEffect, useState} from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import UserUtils from "../../Website/User/UserUtils";
import OrderUtils from "../../Website/Order/OrderUtils";
import {Navigate} from "react-router-dom";
import ListUtils from "../../Website/List/ListUtils";
const BackendListAdmin = (props) => {

    const [listData, setData] = useState([]);
    const [dataType] = useState(props.type);
    const [loading, setLoading] = useState({
        loading: true,
    });

    const fetchListData = () => {

        const funcs = {
            user: UserUtils.getAllUser,
            order: OrderUtils.getAllOrder,
        };
        const funcsPrepare = {
            user: UserUtils.prepareDataUser,
            order: OrderUtils.prepareDataOrder,
        };

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchList = async () => {
                try {
                    if (loading) {
                        const response = await funcs[dataType]();
                        setData(funcsPrepare[dataType](response.data));
                        setLoading(false);
                    }

                } catch (error) {
                    console.error(error);
                }
            };
            fetchList().then();
        });

        const fetchListDataItems = () => {
            return ListUtils.prepareListDataMultiple(listData, dataType);
        };

        return (<div className="grid grid-cols-2 gap-2">
            {fetchListDataItems()}
        </div>);

    };

    return (<div className='flex justify-center max-w-7xl flex-col mx-auto'>
            {<BackendHeader/>}

            <div className="flex justify-between">
                <div className="">

                    <h1 className="mb-10 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3x">
                        {dataType.charAt(0).toUpperCase() + dataType.slice(1)} List - Admin
                    </h1>
                    {(listData) ? fetchListData() : <Navigate to="/"/>}
                </div>
                <div>
                    &nbsp;
                </div>
            </div>
        </div>
    );

}


export default BackendListAdmin;