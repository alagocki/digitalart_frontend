import React from "react";
import BackendHeader from "../../website/backend/BackendHeader";
import SubnaviUserBackend from "../../website/backend/SubnaviUserBackend";
import {getUser} from "../../website/User/User";
import { Navigate } from 'react-router-dom';


class BackendUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getBackendUser = () => {
    return (
        <main className="pt-20">
            <div className='flex justify-center max-w-7xl flex-col mx-auto w-full'>
                {<BackendHeader/>}
                {<SubnaviUserBackend/>}
                <h1 className="mb-4 mt-2 text-lg font-extrabold leading-none tracking-tight text-gray-300 md:text-2xl lg:text-3xl">User</h1>
            </div>
        </main>
    );
    }

    render() {
        return (
            <div>
                {this.getBackendUser()}
            </div>
        );
    }

}

export default BackendUser;