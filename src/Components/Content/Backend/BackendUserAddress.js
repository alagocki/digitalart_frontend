import React from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import Button from "../../Website/Form/Button";
import {Navigate, useParams} from 'react-router-dom';
import UserUtils from "../../Website/User/UserUtils";
import {url as api_url} from "../../Website/Constants";
import {fetchToken} from "../../Website/Auth";
import axios from "axios";
import InputText from "../../Website/Form/InputText";
import InputNumber from "../../Website/Form/InputNumber";
import SubnaviBackendStandard from "../../Website/Backend/SubnaviBackendStandard";

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()}/>;
}

class BackendUserAdress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createdUserId: this.props.params.createduserid,
            createdUserEmail: this.props.params.createduseremail,
            user: '',
            token: '',
            valueForename: '',
            valueLastname: '',
            valueStreet: '',
            valueStreetNumber: '',
            valueCity: '',
            valueZip: '',
            valuePhone: '',
            error: false,
            boxinfo: '',
        };

    }

    handleFieldChange = (inputFieldId, inputFieldValue) => {
        this.setState({[inputFieldId]: inputFieldValue});
    }

    handleSubmitCreateAdress = async () => {


        try {
            let url = api_url + 'user/adress';
            let token = fetchToken();
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };
            const userData = {
                forename: this.state.valueForename,
                lastname: this.state.valueLastname,
                street: this.state.valueStreet,
                number: this.state.valueStreetNumber,
                city: this.state.valueCity,
                zip: this.state.valueZip,
                country: 'DE',
                phone: this.state.valuePhone,
                customer_id: this.state.createdUserId,
            };

            axios.post(url, userData, axiosConfig)
                .then(
                    () => this.setState(
                        {
                            boxinfo: 'Adress created',
                            error: false,

                        }
                    )
                )
                .then(
                    () => this.setState(
                        {
                            valueForename: '',
                            valueLastname: '',
                            valueStreet: '',
                            valueStreetNumber: '',
                            valueCity: '',
                            valueZip: '',
                            valuePhone: '',
                            createdUserId: '',
                        }
                    )
                )
                .catch(error => {
                    let infoMessage = error.message;
                    if (error.response.status === 422) {
                        console.error(error);
                        infoMessage = 'Incorrect Data: ' + error.response.statusText;
                    }
                    this.setState({boxinfo: infoMessage, error: true, code: error.response.status});
                });

        } catch (error) {
            this.setState({info: error.message});
        }

    }

    getBackendUserCreateAdress = () => {

        return (
            <main className="pt-20">
                <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                    {<BackendHeader/>}
                    {<SubnaviBackendStandard type={'user'}/>}

                    <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                        Add User Adress for {this.state.createdUserEmail}
                    </h1>
                    <div className="flex justify-center">

                        <form
                            className="w-full mt-4 border-l border border-white rounded-b-lg rounded-t-lg shadow-xl mx-3">
                            <div className="text-gray-400 text-xl mb-2 bg-gray-300 px-6 py-4 flex rounded-t-lg">
                                <div>{(this.state.error === true) ?
                                    <div className="text-red-800">{this.state.boxinfo}</div> :
                                    this.state.boxinfo}</div>
                            </div>
                            <div className="px-6 py-4">
                                <InputText
                                    id="valueForename"
                                    label="Forename"
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueForename}/>
                                <InputText
                                    id="valueLastname"
                                    label="Lastname"
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueLastname}/>
                                <InputText
                                    id="valueStreet"
                                    label="Street"
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueStreet}/>
                                <InputText
                                    id="valueStreetNumber"
                                    label="Street Number"
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueStreetNumber}/>
                                <InputText
                                    id="valueCity"
                                    label="City"
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueCity}/>
                                <InputNumber
                                    id="valueZip"
                                    label="Zip"
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueZip}/>
                                <InputText
                                    id="valuePhone"
                                    label="Phone"
                                    onChange={this.handleFieldChange}
                                    value={this.state.valuePhone}/>
                                <Button
                                    label="Save"
                                    onClick={this.handleSubmitCreateAdress}
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
                {this.state.user.is_superuser === false ?
                    <Navigate to="/backend"/> : this.getBackendUserCreateAdress()}
            </div>
        );
    }

}


export default withParams(BackendUserAdress);