import React from "react";

import BackendHeader from "../../website/backend/BackendHeader";
import SubnaviUserBackend from "../../website/backend/SubnaviUserBackend";
import InputCheckbox from "../../website/Form/InputCheckbox";
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
            error: false,
            valueIsCustomer: false,
            boxinfo: ''
        };

    }

    handleFieldChange = (inputFieldId, inputFieldValue) => {
        this.setState({[inputFieldId]: inputFieldValue});
    }

    generateCustomerNumber = () => {
        return Math.floor(Math.random() * 100000);
    }

    handleSubmit = async () => {

        let url = api_url + 'register';
        try {
            const userData = {
                email: this.state.valueEmail,
                password: this.state.valuePassword,
                customer: (true === this.state.valueIsCustomer) ? this.generateCustomerNumber() : null,
            };

            axios.post(url, userData)
                .then(
                    () => this.setState(
                        {
                            info: 'User ' + this.state.valueEmail + ' created',
                            valueEmail: '',
                            valuePassword: '',
                            error: false
                        }
                    )
                )
                .catch(error => {
                    let infoMessage = error.message;
                    if (error.response.status === 422) {
                        infoMessage = 'Incorrect email address: ' + this.state.valueEmail;
                    }
                    this.setState({boxinfo: infoMessage, error: true, code: error.response.status});
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

                    <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                        Create new user
                    </h1>
                    <div className="flex justify-center">

                        <form
                            className="w-full mt-4 border-l border border-gray-300 rounded-b-lg rounded-t-lg shadow-xl mx-3">
                            <div className="text-gray-400 text-xl mb-2 bg-gray-300 px-6 py-4 flex rounded-t-lg">
                                <div>{(this.state.error === true) ?
                                    <div className="text-red-800">{this.state.boxinfo}</div> : this.state.boxinfo}</div>
                            </div>
                            <div className="px-6 py-4">
                                <InputCheckbox
                                    id="valueIsCustomer"
                                    label="Is Customer"
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueIsCustomer}/>
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
                                    label="Save"
                                    onClick={this.handleSubmit}
                                />
                            </div>
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
            boxinfo: '+'
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