import React from "react";
import UploadPic from "../Images/upload.png";

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

    handleChangeFile = () => {
        for (let i = 0; i < this.fileInput.current.files.length; i++) {
            this.props.onChange(this.props.id, this.fileInput.current.files[i])
        }
        this.setState({
            countUpload: <li>{this.fileInput.current.files.length} File(s) selected</li>
        });
    }

    componentDidMount() {
        this.setState({
            countUpload: <li>No Files selected</li>
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
                    <div
                        className="flex justify-center border-blue-300 border-dashed border-l border-t border-r p-4 cursor-pointer"
                         onClick={() => this.fileInput.current.click()}>
                        <img className="w-1/12"
                             src={UploadPic}
                             alt="" loading=""/>

                    </div>
                    <div
                        className="flex justify-center border-blue-300 border-dashed border-l border-b border-r p-1 bg-blue-50 w-full text-xs text-blue-500">
                        <ul>{this.state.countUpload} </ul>
                    </div>
                </div>
            </div>
        );
    }
}


export default InputText;