import React, {useEffect, useState} from "react";

import ListItem from "../../website/List/ListItem";
import BackendHeader from "../../website/backend/BackendHeader";
import SubnaviUserBackend from "../../website/backend/SubnaviUserBackend";
import {getAllUser} from "../../website/User/User";


const BackendUserList = () => {

    const [userData, setUser] = useState([]);
    const [loading, setLoading] = useState({
        loading: true,
    });

    const fetchUserData = () => {



        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    if (loading) {
                        const response = await getAllUser();
                        setUser(response.users);
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
                    userData.map((user) => {
                        let elementList = '';
                        // eslint-disable-next-line array-callback-return
                        Object.keys(user).map((key) => {
                            elementList = <ListItem
                                key={user[key]['id']}
                                id={user[key]['id']}
                                email={user[key]['email']}
                                forename={user[key]['forename']}
                                lastname={user[key]['lastname']}
                                street={user[key]['street']}
                                streetnumber={user[key]['number']}
                                city={user[key]['city']}
                                zip={user[key]['zip']}
                            />
                        });
                        return elementList;
                    })}
            </div>
        );

    };

    return (
        <main className="pt-20">
            <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                {<BackendHeader/>}
                {<SubnaviUserBackend/>}

                <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                    User List
                </h1>
                {fetchUserData()}
            </div>
        </main>
    )
        ;

}


export default BackendUserList;