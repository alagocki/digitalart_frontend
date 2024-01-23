import React from "react";

import BackendHeader from "../../website/backend/BackendHeader";
import Button from "../../website/Form/Button";
import {Navigate} from 'react-router-dom';
import {getAllUser, getUser} from "../../website/User/User";
import {url as api_url} from "../../website/Constants";
import {fetchToken} from "../../website/Auth";
import axios from "axios";
import SubnaviOrderBackend from "../../website/backend/SubnaviOrderBackend";
import InputText from "../../website/Form/InputText";
import InputDropdown from "../../website/Form/InputDropdown";


class BackendOrderCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            token: '',
            valueTopic: '',
            valueInfo: '',
            valueStatus: '',
            valueCustomer: '',
            error: false,
            boxinfo: '',
            newOrderCreated: false,
            preparedUserData: '',
        };

    }

    handleFieldChange = (inputFieldId, inputFieldValue) => {
        this.setState({[inputFieldId]: inputFieldValue});
    }

    handleSubmit = async () => {

        try {

            let url = api_url + 'order/create';
            let token = fetchToken();
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };
            const orderData = {
                topic: this.state.valueTopic,
                info: this.state.valueInfo,
                status: ('' !== this.state.valueStatus) ? this.state.valueStatus : 'offen',
                customer_id: this.state.valueCustomer,
                images: [
                    {
                        "name": "bild1.jpg",
                        "description": "Bild 1",
                        "status": "unbearbeitet",
                        "downloaded": false,
                        "path": "path/to/image1.jpg"
                    },
                    {
                        "name": "bild2.jpg",
                        "description": "Bild 2",
                        "status": "unbearbeitet",
                        "downloaded": false,
                        "path": "path/to/image2.jpg"
                    }
                ]
            };

            console.log(orderData);

            axios.post(url, orderData, axiosConfig)
                .then(
                    () => this.setState(
                        {
                            boxinfo: 'Order ' + this.state.valueTopic + ' created',
                            error: false,
                            newUserCreated: true,
                            valueTopic: '',
                            valueInfo: '',
                        }
                    )
                )
                .catch(error => {
                    let infoMessage = error.message;
                    console.log(error);
                    // if (error.response.status === 422) {
                    //     infoMessage = 'Incorrect Order (Status 422)';
                    // }
                    // if (error.response.status === 400) {
                    //     infoMessage = 'Order ' + this.state.valueTopic + ' already exists';
                    // }
                    // this.setState({boxinfo: infoMessage, error: true, code: error.response.status});
                });

        } catch (error) {
            this.setState({info: error.message});
        }

    }

    prepareUserData = () => {
        const items = [];
        const customerData = getAllUser()

        customerData
            .then((data) => data)
            .then((userdata) => {
                    // eslint-disable-next-line array-callback-return
                    userdata.users.map((user) => {
                        items.push({[user[0].id]: user[0].forename + ' ' + user[0].lastname});
                    })
                }
            )
            .catch(error => console.log(error));

        return items;
    }


    getBackendOrderCreate = () => {

        const UserData = {
            items: this.prepareUserData()
        }

        const Status = {
            items: [
                {"offen": "Open"},
                {"erledigt": "Done"},
                {"in_klaerung": "Clarification"}
            ]
        };

        return (
            <main className="pt-20">
                <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                    {<BackendHeader/>}
                    {<SubnaviOrderBackend/>}

                    <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                        Create new order
                    </h1>
                    <div className="flex justify-center">

                        <form
                            className="w-full mt-4 border-l border border-gray-300 rounded-b-lg rounded-t-lg shadow-xl mx-3">
                            <div className="text-gray-400 text-xl mb-2 bg-gray-300 px-6 py-4 flex rounded-t-lg">
                                <div>{(this.state.error === true) ?
                                    <div className="text-red-800">{this.state.boxinfo}</div> : this.state.boxinfo}
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                <InputText
                                    id="valueTopic"
                                    label="Topic"
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueTopic}/>
                                <InputText
                                    id="valueInfo"
                                    label="Info"
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueInfo}/>
                                <InputDropdown
                                    id="valueCustomer"
                                    label="Customer"
                                    items={UserData}
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueCustomer}/>
                                <InputDropdown
                                    id="valueStatus"
                                    label="Status"
                                    items={Status}
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueStatus}/>
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
                {this.state.user.is_superuser === false ? <Navigate to="/backend"/> : this.getBackendOrderCreate()}
            </div>
        );
    }

}


export default BackendOrderCreate;