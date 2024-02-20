import React, {useEffect, useState} from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import UserUtils from "../../Website/User/UserUtils";
import ListItem from "../../Website/List/ListItem";
import OrderUtils from "../../Website/Order/OrderUtils";
import SubnaviBackendStandard from "../../Website/Backend/SubnaviBackendStandard";
import {Navigate} from "react-router-dom";
import ListUtils from "../../Website/List/ListUtils";


const BackendListUser = (props) => {

    const [listData, setData] = useState([]);
    const [dataType] = useState(props.type);
    const [loading, setLoading] = useState({
        loading: true,
    });

    const fetchListData = () => {

        const funcs = {
            user: UserUtils.getUser,
            order: OrderUtils.getOrderByUserId,
        };
        const funcsPrepare = {
            user: UserUtils.prepareDataSingleUser,
            order: OrderUtils.prepareDataOrder,
        };

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchList = async () => {
                try {
                    if (loading) {
                        const response = await funcs[dataType]();
                        if (response) {
                            let resData = ('undefined' !== typeof response.data) ? response.data : response;
                            setData(funcsPrepare[dataType](resData));
                        }
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

            {("user" === dataType) ?
                <ListItem
                    id={listData['id']}
                    key={listData['id']}
                    headlineCardHeader={listData['headlineCardHeader']}
                    headline2={listData['headline2']}
                    headline1={listData['headline1']}
                    info1={listData['info1']}
                    info2={listData['info2']}
                    info3={listData['info3']}
                    dataType={dataType}
                /> :
                fetchListDataItems()
            }
        </div>);
    };

    return (<div className='flex justify-center max-w-7xl flex-col mx-auto'>
            {<BackendHeader/>}
            <SubnaviBackendStandard type={dataType}/>

            <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                {dataType.charAt(0).toUpperCase() + dataType.slice(1)} List
            </h1>
            {(listData) ? fetchListData() : <Navigate to="/"/>}
        </div>
    );

}


export default BackendListUser;