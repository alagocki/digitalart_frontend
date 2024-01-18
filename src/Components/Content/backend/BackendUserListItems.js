import React, {useEffect, useState} from "react";

import {url as api_url} from "../../website/Constants";
import {fetchToken} from "../../website/Auth";
import axios from "axios";
import ListItemContainer from "../../website/List/ListItemContainer";


const BackendUserListItems = () => {


    const fetchImagesData = () => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [userData, setUser] = useState([]);

        let token = fetchToken();
        let url = api_url + 'user/all';
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get(url, options);
                    if (response.status === 200) {
                        // console.log(response.data.users);
                        setUser(response.data.users);
                    } else {
                        console.error('ERROR: ' + response.status);
                    }

                } catch (error) {
                    console.error(error);
                }
            };
            fetchUsers();
        }, []);

        return (
            <div className="flex flex-row justify-center items-center">
                {
                    userData.map((user) => {
                        let elementList = '';
                        // eslint-disable-next-line array-callback-return
                        Object.keys(user).map((key) => {
                            elementList = <ListItemContainer
                                key={user[key]['id']}
                                id={user[key]['id']}
                                email={user[key]['email']}
                                forename={user[key]['forename']}
                                lastname={user[key]['lastname']}/>
                            // elementList = <li className="" key={user[key]['id']}>{user[key]['email']}</li>;
                        });
                        return elementList;
                    })}
            </div>
        );

    };

    return (
        <div>{fetchImagesData()}</div>
    );

}


export default BackendUserListItems;