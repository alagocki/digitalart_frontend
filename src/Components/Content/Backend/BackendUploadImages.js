import React from "react";
import {url as api_url} from "../../Website/Constants";
import BackendHeader from "../../Website/Backend/BackendHeader";
import SubnaviBackendImages from "../../Website/Backend/SubnaviBackendImages";
import Button from "../../Website/Form/Button";
import InputFile from "../../Website/Form/InputFile";
import UserUtils from "../../Website/User/UserUtils";
import {fetchToken} from "../../Website/Auth";
import {Navigate} from "react-router-dom";
import axios from "axios";
import InputText from "../../Website/Form/InputText";
import ImageUtils from "../../Website/Images/ImageUtils";

class BackendUploadImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueTopic: '',
            selectedFile: []
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

            let imageData = [];
            let url = api_url + 'images/create';
            let axiosConfig = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + fetchToken()
                }
            };

            imageData = ImageUtils.prepareImageDataNew(this.state.selectedFile, this.state.valueTopic);

            const timer = setTimeout(() => {

                if (null !== imageData) {

                    let axiosData = {
                        data: JSON.stringify(imageData)
                    }

                    axios.post(url, axiosData, axiosConfig)
                        .then(
                            () => this.setState(
                                {
                                    selectedFile: [],
                                    valueTopic: '',
                                    boxinfo: 'Uploaded ' + imageData.length + ' Files'
                                }
                            )
                        )
                        .catch(error => {
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


    getImageUpload = () => {
        return (
            <main className="pt-20">
                <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                    {<BackendHeader/>}
                    <SubnaviBackendImages/>

                    <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                        Image Upload - Admin
                    </h1>
                    <div className="flex justify-center">

                        <form
                            className="w-full mt-4 border-l border border-white rounded-b-lg rounded-t-lg shadow-xl mx-3">
                            <div className="text-gray-400 text-xl mb-2 bg-gray-300 px-6 py-4 flex rounded-t-lg">
                                <div>{(this.state.error === true) ?
                                    <div className="text-red-800">{this.state.boxinfo}</div> : this.state.boxinfo}
                                </div>
                            </div>

                            <div className="px-6 py-4 w-full">
                                <InputText
                                    id="valueTopic"
                                    label="Topic"
                                    onChange={this.handleFieldChange}
                                    value={this.state.valueTopic}/>
                                <InputFile
                                    id="selectedFile"
                                    label="Files"
                                    customer="true"
                                    onChange={this.handleFieldChangeFile}
                                    value={this.state.selectedFile}/>
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
                {UserUtils.isSuperUser() === false ? <Navigate to="/backend"/> : this.getImageUpload()}
            </div>
        );
    }

}


export default BackendUploadImages;