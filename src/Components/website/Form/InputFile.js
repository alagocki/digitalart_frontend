import React from "react";
import Header_Pic from "../images/upload.png";
import axios from "axios";
import {url as api_url} from "../Constants";
import {fetchToken} from "../Auth";

// import * as fs from "fs";

class InputText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputid: props.id,
            label: props.label,
            customer: props.customer,
            selectedFile: null,
            countUpload: '',
        };
        this.fileInput = React.createRef();
    }

    handleChangeFile = (event) => {
        event.preventDefault();
        // for (let i = 0; i < this.fileInput.current.files.length; i++) {
        //     this.props.onChange(this.props.id, this.fileInput.current.files[i].name);
        //     this.setState({
        //         // selectedFile: this.fileInput.current.files[i],
        //         selectedFile: event.target.files[i],
        //     });
        // }
        this.setState({
            // selectedFile: this.fileInput.current.files[i],
            selectedFile: event.target.files[0],
            countUpload: <li>{this.fileInput.current.files.length} Dateien ausgewählt</li>
        });
    }

    fileUploadHandler = (event) => {

        if (!this.state.selectedFile) {
            return;
        }
        let url = api_url + 'order/images/upload';
        let token = fetchToken();
        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            },
            onUploadProgress: progressEvent => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
            }
        };
        const fd = new FormData();
        fd.append('file_upload', this.state.selectedFile, this.state.selectedFile.name);

        axios.post(url, fd, axiosConfig)
            .then(res => {
                this.setState({
                    countUpload: <li>{this.fileInput.current.files.length} Dateien hochgeladen</li>
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.setState({
            countUpload: <li>Keine Datei ausgewählt</li>
        });
    }

    render() {
        return (
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    &nbsp;
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                           htmlFor="inline-full-name">
                        {this.state.label}
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        style={{display: 'none'}}
                        id={this.state.inputid}
                        type="file"
                        ref={this.fileInput}
                        onChange={this.handleChangeFile}
                        multiple
                    />
                    <div className="flex justify-center border-blue-300 border-dashed border p-4 cursor-pointer"
                         onClick={() => this.fileInput.current.click()}>
                        <img className="w-1/12"
                             src={Header_Pic}
                             alt="" loading=""/>

                    </div>
                    <div
                        className="flex justify-center border-blue-300 mt-2 border-l border-t border-r p-1 bg-blue-50 w-full text-xs text-blue-500">
                        <ul>{this.state.countUpload} </ul>
                    </div>
                    <button
                        className="flex justify-center border-blue-300 border-l border-b border-r p-1 bg-blue-50 w-full"
                        onClick={() => this.fileUploadHandler()}
                        type="button">
                        Upload
                    </button>
                </div>
            </div>
        );
    }

}

export default InputText;