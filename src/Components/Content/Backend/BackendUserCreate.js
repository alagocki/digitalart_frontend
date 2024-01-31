import React from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import InputCheckbox from "../../Website/Form/InputCheckbox";
import InputEmail from "../../Website/Form/InputEmail";
import InputPassword from "../../Website/Form/InputPassword";
import Button from "../../Website/Form/Button";
import {Navigate} from 'react-router-dom';
import {getUser} from "../../Website/User/User";
import {url as api_url} from "../../Website/Constants";
import {fetchToken} from "../../Website/Auth";
import axios from "axios";
import SubnaviBackendStandard from "../../Website/Backend/SubnaviBackendStandard";


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
            boxinfo: '',
            newUserCreated: false,
            createdUserId: '',
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
                    (response) => this.setState(
                        {
                            boxinfo: 'User ' + this.state.valueEmail + ' created',
                            error: false,
                            newUserCreated: true,
                            createdUserId: response.data.id,
                        }
                    )
                )
                .catch(error => {
                    let infoMessage = error.message;
                    if (error.response.status === 422) {
                        infoMessage = 'Incorrect email address: ' + this.state.valueEmail;
                    }
                    if (error.response.status === 400) {
                        infoMessage = 'User ' + this.state.valueEmail + ' already exists';
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
                    {<SubnaviBackendStandard type={'user'}/>}

                    <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                        Create new user
                    </h1>
                    <div className="flex justify-center">

                        <form
                            className="w-full mt-4 border-l border border-white rounded-b-lg rounded-t-lg shadow-xl mx-3">
                            <div className="text-gray-400 text-xl mb-2 bg-gray-300 px-6 py-4 flex rounded-t-lg">
                                <div>{(this.state.error === true) ?
                                    <div className="text-red-800">{this.state.boxinfo}</div> : this.state.boxinfo}
                                </div>
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
        if (this.state.newUserCreated === true) {
            const url = '/backend/user/create-address/' + this.state.createdUserId + '/' + encodeURIComponent(this.state.valueEmail)
            return <Navigate to={url}/>;
        }

        return (
            <div>
                {this.state.user.is_superuser === false ? <Navigate to="/backend"/> : this.getBackendUserCreate()}
            </div>
        );
    }

}


export default BackendUserCreate;