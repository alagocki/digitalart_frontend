import React from "react";

import BackendHeader from "../../website/backend/BackendHeader";
import SubnaviUserBackend from "../../website/backend/SubnaviUserBackend";
import InputEmail from "../../website/Form/InputEmail";
import InputPassword from "../../website/Form/InputPassword";
import Button from "../../website/Form/Button";
import { Navigate } from 'react-router-dom';
import {getUser} from "../../website/User/User";

class BackendUserCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }

    getBackendUserCreate = () => {
        console.log(this.state.user);
        return (
            <main className="pt-20">
                <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                    {<BackendHeader/>}
                    {<SubnaviUserBackend/>}
                    <h1 className="mb-4 mt-2 text-lg font-extrabold leading-none tracking-tight text-gray-300 md:text-2xl lg:text-3xl">Create
                        new User</h1>
                    <div className="flex justify-center">
                        <form className="w-4/5 mt-4 border-l border-b border-white p-4 rounded-b-lg shadow-xl">
                            <InputEmail id="userEmailInput" label="Email"/>
                            <InputPassword id="userPasswordInput" label="Passwort"/>
                            <Button label="Speichern"/>
                        </form>
                    </div>
                </div>
            </main>
        );
    }

    componentDidMount() {
        this.setState({
            user: getUser()
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



export default BackendUserCreate;