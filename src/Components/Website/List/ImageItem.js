import React from "react";
import {url as api_url} from "../Constants";
import {fetchToken} from "../Auth";
import axios from "axios";
import ModalImage from "react-modal-image";
import ImageCover from "../Backend/ImageCover";
import {isSuperUser} from "../User/UserService";

class ImageItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            orderId: props.orderId,
            image: props.image,
            open: false,
            ordered: props.image.ordered,
            selectedImagesCustomer: props.selectedImagesCustomer,
            plus: true,
        };
    }

    reload = () => {
        window.location.reload(false)
    }

    handleChangeCnt = (type) => {
        if (type === 'plus') {
            this.props.onChangePlus();
            this.setState({
                ordered: true,
                plus: false,
            })
        } else {
            this.props.onChangeMinus();
            this.setState({
                ordered: false,
                plus: true
            })
        }
    }

    handleChangeImage = (image) => {
        this.setState({
            image: image
        })
    }

    handleOpenLigthbox = (value) => (
        this.setState({
            open: this.state.open === value ? 0 : value
        })
    );

    deleteImage = (id) => {
        let url = api_url + 'image/delete/' + id + '/' + this.state.orderId;
        let axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + fetchToken()
            }
        };

        axios.delete(url, axiosConfig)
            .then((response) => {
                this.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    }

    getCSSClassesImagedLocked = () => {
        if (this.state.ordered === true) {
            return "border-2 m-3 rounded-b-lg rounded-t-lg shadow-gray-300 shadow-xl w-96 border-red-400 bg-gray-400"
        } else {
            return "border m-3 rounded-b-lg rounded-t-lg shadow-gray-300 shadow-xl w-96 border-white  bg-white"
        }
    }


    render() {
        return (
            <div className={this.getCSSClassesImagedLocked()} key={this.state.id}>
                <div className="h-80">
                    <div
                        className="text-blue-700 text-xl mb-2 bg-amber-950 px-6 py-4 flex justify-between rounded-t-lg border border-amber-950">
                        <div className="text-white text-xs">{this.state.image.name}</div>
                    </div>
                    <div className="flex justify-center relative">
                        {(this.state.ordered === true) ? <ImageCover/> : null}
                        <div className="px-6 py-4 overflow-hidden ">
                            {/*<img src={this.state.image.base64encoded} alt={this.state.image.name} className="max-h-52"/>*/}
                            <ModalImage
                                small={this.state.image.base64encoded}
                                large={this.state.image.base64encoded}
                                alt={this.state.image.name}
                                onClick={() => this.handleOpenLigthbox(1)}
                                hideDownload="false"
                                className="h-60 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
                <div className="px-6 pt-4 pb-2 flex align-bottom justify-between">
                    <span
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <div className="text-white text-xs">
                        {(false === this.state.ordered) ?
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    title="Add image to order"
                                    onClick={() => this.handleChangeCnt('plus')}>+
                            </button>
                            : <button className="bg-red-500 hover:red-blue-700 text-white font-bold py-1 px-2 rounded"
                                      title="Remove image from order"
                                      onClick={() => this.handleChangeCnt('minus')}>-
                            </button>}
                        {(isSuperUser() && false === this.state.ordered) ?
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-1"
                                    onClick={() => this.deleteImage(this.state.id)}
                                    title="Delete image">X</button> : null}
                    </div>
                </div>
            </div>
        );
    }

}

export default ImageItem