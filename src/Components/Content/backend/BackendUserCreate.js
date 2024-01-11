import React from "react";

import BackendHeader from "../../website/backend/BackendHeader";
import SubnaviUserBackend from "../../website/backend/SubnaviUserBackend";
import InputEmail from "../../website/Form/InputEmail";
import InputPassword from "../../website/Form/InputPassword";
import Button from "../../website/Form/Button";
import {Navigate} from 'react-router-dom';
import {getUser} from "../../website/User/User";
import {url as api_url} from "../../website/Constants";
import {fetchToken} from "../../website/Auth";
import axios from "axios";

class BackendUserCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            token: '',
            valueEmail: '',
            valuePassword: '',
            valueCustomerNo: '',
            info: '',
            error: false,
            isCustomer: false
        };

    }

    handleFieldChange = (inputFieldId, inputFieldValue) => {
        this.setState({[inputFieldId]: inputFieldValue});
    }

    handleSubmit = async () => {

        let url = api_url + 'register';
        try {
            const userData = {
                email: this.state.valueEmail,
                password: this.state.valuePassword,
                customer: ('' !== this.state.valueCustomerNo) ? this.state.valueCustomerNo : null,
            };

            axios.post(url, userData)
                .then(
                    () => this.setState(
                        {
                            info: 'User ' + this.state.valueEmail + ' created',
                            valueEmail: '',
                            valuePassword: '',
                            valueCustomerNo: '',
                            error: false
                        }
                    )
                )
                .catch(error => {
                    this.setState({info: error.message, error: true});
                });

        } catch (error) {
            this.setState({info: error.message});
        }

    }

    getBackendUserCreate = () => {
        return (
            <main className="pt-20">
                <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                    {<BackendHeader/>}
                    {<SubnaviUserBackend/>}

                    <h1 className="mb-4 mt-2 text-lg font-extrabold leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                        {(this.state.error === true) ?
                            <div className="text-red-800">{this.state.info}</div> : this.state.info}
                    </h1>
                    <div className="flex justify-center">
                        <form className="w-4/5 mt-4 border-l border-b border-white p-4 rounded-b-lg shadow-xl">
                            <InputEmail
                                id="valueEmail"
                                label="Email"
                                onChange={this.handleFieldChange}
                                value={this.state.valueEmail}/>
                            <InputPassword
                                id="valuePassword"
                                label="Passwort"
                                onChange={this.handleFieldChange}
                                value={this.state.valuePassword}/>
                            <Button
                                label="Speichern"
                                onClick={this.handleSubmit}
                            />
                        </form>

                    </div>
                </div>
            </main>
        );
    }

    componentDidMount() {
        this.setState({
            user: getUser(),
            token: fetchToken(),
            info: 'Create new user'
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