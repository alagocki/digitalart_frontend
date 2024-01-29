import React, {useEffect, useState} from "react";

import BackendHeader from "../../website/backend/BackendHeader";
import {getAllUser, prepareDataUser} from "../../website/User/User";
import ListItem from "../../website/List/ListItem";
import {getAllOrder, prepareDataOrder} from "../../website/Order/Order";
import SubnaviBackendStandard from "../../website/backend/SubnaviBackendStandard";
import {Navigate} from "react-router-dom";


const BackendUserList = (props) => {

    const [listData, setData] = useState([]);
    const [dataType] = useState(props.type);
    const [loading, setLoading] = useState({
        loading: true,
    });

    const fetchListData = () => {

        const funcs = {
            user: getAllUser,
            order: getAllOrder,
        };
        const funcsPrepare = {
            user: prepareDataUser,
            order: prepareDataOrder,
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

        return (
            <div className="grid grid-cols-2 gap-2">
                {
                    listData.map((data) => {
                        let elementList = '';
                        // eslint-disable-next-line array-callback-return
                        Object.keys(data).map(() => {
                            elementList = <ListItem
                                id={data['id']}
                                key={data['id']}
                                headlineCardHeader={data['headlineCardHeader']}
                                headline2={data['headline2']}
                                headline1={data['headline1']}
                                info1={data['info1']}
                                info2={data['info2']}
                                info3={data['info3']}
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
                <SubnaviBackendStandard type={dataType}/>

                <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                    {dataType.charAt(0).toUpperCase() + dataType.slice(1)} List
                </h1>
                {(listData) ? fetchListData() : <Navigate to="/"/>}
            </div>
        </main>
    );

}


export default BackendUserList;