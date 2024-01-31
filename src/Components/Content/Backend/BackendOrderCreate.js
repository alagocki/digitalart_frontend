import React from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import Button from "../../Website/Form/Button";
import {Navigate} from 'react-router-dom';
import {getAllUser, getUser} from "../../Website/User/User";
import {url as api_url} from "../../Website/Constants";
import {fetchToken} from "../../Website/Auth";
import axios from "axios";
import InputText from "../../Website/Form/InputText";
import InputDropdown from "../../Website/Form/InputDropdown";
import InputFile from "../../Website/Form/InputFile";
import InputDatePicker from "../../Website/Form/InputDatePicker";
import SubnaviBackendStandard from "../../Website/Backend/SubnaviBackendStandard";

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
            valueShootingDate: '',
            selectedFile: [],
            error: false,
            boxinfo: '',
            newOrderCreated: false,
            preparedUserData: '',
        };
    }

    handleFieldChange = (inputFieldId, inputFieldValue) => {
        this.setState({[inputFieldId]: inputFieldValue});
    }

    handleFieldChangeFile = (inputFieldId, inputFieldValue) => {
        this.setState(prevState => ({
            selectedFile: [...prevState.selectedFile, inputFieldValue]
        }))
    }

    handleSubmit = () => {

        try {

            let token = fetchToken();

            let imageData = [];
            let url = api_url + 'order/create';
            let axiosConfig = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };

            for (let i = 0; i < this.state.selectedFile.length; i++) {

                const image = this.state.selectedFile[i];

                const fileReader = new FileReader();
                fileReader.readAsDataURL(image);

                fileReader.onload = () => {
                    imageData[i] = {
                        name: image.name,
                        description: 'Bild ' + i,
                        status: 'unbearbeitet',
                        ordered: false,
                        base64encoded: fileReader.result
                    }
                };

                fileReader.onerror = (error) => {
                    console.log('Error: ', error);
                };

            }

            const timer = setTimeout(() => {
                const orderData = {
                    topic: this.state.valueTopic,
                    info: this.state.valueInfo,
                    order_number: Math.floor(Math.random() * 100000),
                    shooting_date: this.state.valueShootingDate, //'2024-01-08 07:38:04.844915',
                    status: ('' !== this.state.valueStatus) ? this.state.valueStatus : 'offen',
                    customer_id: this.state.valueCustomer,
                    images: imageData
                };

                axios.post(url, orderData, axiosConfig)
                    .then(
                        () => this.setState(
                            {
                                boxinfo: 'Order ' + this.state.valueTopic + ' created',
                                error: false,
                                newUserCreated: true,
                                valueTopic: '',
                                valueInfo: '',
                                valueStatus: '',
                                valueCustomer: '',
                                selectedFile: null,
                            }
                        )
                    )
                    .catch(error => {
                        console.error(error);
                        let infoMessage = error.message;
                        if (error.response.status === 422) {
                            infoMessage = 'Incorrect Order (Status 422)';
                        }
                        if (error.response.status === 400) {
                            infoMessage = 'Order ' + this.state.valueTopic + ' already exists';
                        }
                        this.setState({boxinfo: infoMessage, error: true, code: error.response.status});
                    });

            }, 1000);
            return () => clearTimeout(timer);

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
                userdata.data.map((user) => {
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
                    {<SubnaviBackendStandard type={'order'}/>}

                    <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                        Create new order
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
                                <InputDatePicker
                                    id="valueShootingDate"
                                    label="Shooting Date"
                                    value={this.state.valueShootingDate}
                                    onChange={this.handleFieldChange}/>
                                <InputFile
                                    id="selectedFile"
                                    label="Files"
                                    customer="true"
                                    onChange={this.handleFieldChangeFile}
                                    value={this.state.selectedFile}/>
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