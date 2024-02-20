import React from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import Button from "../../Website/Form/Button";
import {Navigate} from 'react-router-dom';
import UserUtils from "../../Website/User/UserUtils";
import {url as api_url} from "../../Website/Constants";
import {fetchToken} from "../../Website/Auth";
import axios from "axios";
import InputText from "../../Website/Form/InputText";
import InputDropdown from "../../Website/Form/InputDropdown";
import InputDatePicker from "../../Website/Form/InputDatePicker";
import SubnaviBackendStandard from "../../Website/Backend/SubnaviBackendStandard";
import InputMoney from "../../Website/Form/InputMoney";
import InputTextArea from "../../Website/Form/InputTextArea";
import OrderUtils from "../../Website/Order/OrderUtils";

class BackendOrderCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            token: '',
            valueTopic: '',
            valuePrice: '',
            valueAddPicPrice: '',
            valueConditions: '',
            valueInfo: '',
            valueStatus: '',
            valueCustomer: '',
            valueShootingDate: '',
            valueIncludeMedia: '',
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

    // handleFieldChangeFile = (inputFieldId, inputFieldValue) => {
    //     this.setState(prevState => ({
    //         selectedFile: [...prevState.selectedFile, inputFieldValue]
    //     }))
    // }

    handleSubmit = () => {

        try {

            let url = api_url + 'order/create';
            let axiosConfig = {
                headers: {
                    'Authorization': 'Bearer ' + fetchToken()
                }
            };

            // imageData = OrderUtils.prepareImageDataNew(this.state.selectedFile);

            const timer = setTimeout(() => {

                const orderData = OrderUtils.orderDataForApi(this.state, 'insert');

                if (null !== orderData) {
                    axios.post(url, orderData, axiosConfig)
                        .then(
                            () => this.setState(
                                {
                                    boxinfo: 'Order ' + this.state.valueTopic + ' created',
                                    valueTopic: '',
                                    valueInfo: '',
                                    valueShootingDate: '',
                                    valueStatus: '',
                                    valueCustomer: '',
                                    valuePrice: '',
                                    valueAddPicPrice: '',
                                    valueConditions: '',
                                    valueIncludeMedia: '',
                                    selectedFile: []
                                }
                            )
                        )
                        .catch(error => {
                            console.log(error)
                            let infoMessage = error.message;
                            if (error.response.status === 422) {
                                infoMessage = 'Incorrect Order (Status 422)';
                            }
                            if (error.response.status === 400) {
                                infoMessage = 'Order ' + this.state.valueTopic + ' already exists';
                            }
                            this.setState({boxinfo: infoMessage, error: true, code: error.response.status});
                        });
                }
            }, 1000);
            return () => clearTimeout(timer);


        } catch (error) {
            this.setState({info: error.message});
        }

    }

    prepareUserData = () => {
        const items = [];
        const customerData = UserUtils.getAllUser()

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

    getOptionValues = () => {
        const items = [];
        for (let i = 1; i < 6; i++) {
            items.push({[i]: i});
        }
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

        const includeMedia = {
            items: this.getOptionValues()
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
                            <div className="flex justify-between">
                                <div className="px-6 py-4 w-1/2">
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
                                    <InputMoney
                                        id="valuePrice"
                                        label="Price"
                                        onChange={this.handleFieldChange}
                                        value={this.state.valuePrice}/>
                                    <InputMoney
                                        id="valueAddPicPrice"
                                        label="Price Additional Pic"
                                        onChange={this.handleFieldChange}
                                        value={this.state.valueAddPicPrice}/>
                                    <InputTextArea
                                        id="valueConditions"
                                        label="Conditions"
                                        onChange={this.handleFieldChange}
                                        value={this.state.valueConditions}/>
                                </div>
                                <div className="px-6 py-4 w-1/2">
                                    <InputDropdown
                                        id="valueIncludeMedia"
                                        label="Quantity incl. media"
                                        items={includeMedia}
                                        onChange={this.handleFieldChange}
                                        value={this.state.valueIncludeMedia}/>
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
                                </div>
                            </div>
                            <div className="px-6 py-4 w-1/2">
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
            user: UserUtils.getUser(),
            token: fetchToken(),
            boxinfo: '+'
        });
    }

    render() {

        return (
            <div>
                {UserUtils.isSuperUser() === false ? <Navigate to="/backend"/> : this.getBackendOrderCreate()}
            </div>
        );
    }

}


export default BackendOrderCreate;