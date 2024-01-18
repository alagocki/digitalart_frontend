import React, {useEffect, useState} from "react";

import BackendHeader from "../../website/backend/BackendHeader";
import SubnaviUserBackend from "../../website/backend/SubnaviUserBackend";
import {Navigate} from 'react-router-dom';
import {getUser} from "../../website/User/User";
import {url as api_url} from "../../website/Constants";
import {fetchToken} from "../../website/Auth";
import axios from "axios";
import BackendUserListItems from "./BackendUserListItems";


class BackendUserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            token: '',
            info: '',
            error: false,
        };

    }

    getBackendUserCreate = () => {
        return (
            <main className="pt-20">
                <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                    {<BackendHeader/>}
                    {<SubnaviUserBackend/>}

                    <h1 className="mb-4 mt-2 leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                        {(this.state.error === true) ?
                            <div className="text-red-800">{this.state.info}</div> : this.state.info}
                    </h1>
                    <div>
                        {<BackendUserListItems/>}
                    </div>
                </div>
            </main>
        );
    }

    componentDidMount() {
        this.setState({
            user: getUser(),
            token: fetchToken(),
            info: 'List all user'
        });
    }

    render() {
        return (
            <div>
                {this.state.user.is_superuser === false ? <Navigate to="/backend/user"/> : this.getBackendUserCreate()}
            </div>
        );
    }

}


export default BackendUserList;