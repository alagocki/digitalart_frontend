import React from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import {Navigate} from "react-router-dom";
import UserUtils from "../../Website/User/UserUtils";
import OrderUtils from "../../Website/Order/OrderUtils";
import {Accordion, AccordionBody, AccordionHeader} from "@material-tailwind/react";
import UploadPic from "../../Website/ImagesFiles/plus.png";
import ImageUtils from "../../Website/Images/ImageUtils";
import ModalImage from "react-modal-image";

class BackendOrderAddImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boxinfo: '',
            error: '',
            orders: [],
            images: [],
            assignedImages: [],
            order_images: [],
        };
    }

    getAllOrders = () => {
        OrderUtils.getAllOrder().then((response) => {
            this.setState({orders: response.data});
        });
    };
    getAllImages = () => {
        ImageUtils.getAllImages().then((response) => {
            this.setState({images: response.images});
        });
    };

    handleOpen = (value) => (
        this.setState({
            orderId: this.state.orderId === value ? null : value
        }),
            this.state.orderId === value ? null : this.getOrderedImages(value)
    );

    getOrderedImages = (orderId) => {
        ImageUtils.getOrderImages(orderId).then((response) => {
            this.setState({order_images: response.images_data});
        });
    };

    onDragStart = (event, id) => {
        event.dataTransfer.setData("text/plain", id);
        event.dataTransfer.effectAllowed = "copy";
        console.log("dragstart", id);
    };

    onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    };

    onDrop = (event, orderId) => {

        event.preventDefault();
        const imageId = event.dataTransfer.getData("text/plain");
        const dragedImage = document.getElementById(imageId);
        event.target.appendChild(dragedImage);

        ImageUtils.addImageToOrder(orderId, imageId).then((response) => {
            console.log(response);
        });

        const imgContainer = document.getElementById("img-container-" + imageId);
        const timer = setTimeout(() => {
            imgContainer.appendChild(dragedImage);
            this.getOrderedImages(orderId);
        }, 1000);
        return () => clearTimeout(timer);

    };

    showOrderAndImageData = () => {
        return (
            <main className="pt-20">
                <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                    {<BackendHeader/>}

                    <h1 className="mb-10 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3x">
                        Add Images to Order
                    </h1>

                    <div className="flex justify-end mb-5 mr-3 text-gray-500 text-xs">
                        Drag Images to the right box. Use the grey field containing the image name
                    </div>
                    <div className="flex justify-between">

                        <div className="w-1/§">

                            {this.state.orders.map((order, index) => {
                                return (
                                    <Accordion open={this.state.orderId === order[0].id} key={index}
                                               className="border border-gray-300 px-2 rounded-b-lg rounded-t-lg mb-1">
                                        <AccordionHeader onClick={() => this.handleOpen(order[0].id)} className="flex">
                                            <div className="w-full flex justify-between">
                                                <div>
                                                    <h1 className="text-xs/[10px] w-48 ">{order[0].topic}</h1>
                                                    <span
                                                        className="text-xs/[4px] text-gray-400">{order[0].order_number}</span>
                                                </div>
                                                <img className="w-8 h-8"
                                                     src={UploadPic}
                                                     alt="" loading=""/>
                                            </div>

                                        </AccordionHeader>
                                        <AccordionBody>
                                            <div className="px-3 py-1">
                                                <div className="flex justify-between mb-1">
                                                    <div>
                                                        <h1 className="text-xs/[10px] text-blue-900">{order[0].info}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-1">
                                                <div className="flex justify-between">
                                                    <div
                                                        className="bg-gray-100 w-full h-full p-2 rounded-b-lg rounded-t-lg slot"
                                                        onDrop={(e) => this.onDrop(e, order[0].id)}
                                                        onDragOver={(e) => this.onDragOver(e)}>
                                                        Bilder
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-1">
                                                <div className="flex justify-between">
                                                    <div
                                                        className="w-full h-full p-2 border rounded-b-lg rounded-t-lg slot grid grid-cols-4 gap-4">
                                                        {this.state.order_images.map((image, index) => {
                                                            return <img key={index} alt={image[0].name}
                                                                        src={image[0].base64encoded}
                                                                        className="w-20 m-0.5"/>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionBody>
                                    </Accordion>
                                );
                            })}

                        </div>
                        <div className="grid grid-cols-3 gap-3 w-2/3">
                            {this.state.images.map((image, index) => {
                                const containerId = "img-container-" + image.id;
                                return (
                                    <div key={index}
                                         className="bg-gray-200 p-2 border border-gray-300 px-2 rounded-b-lg rounded-t-lg m-1">
                                        <div>
                                            <div className="flex justify-center relative">
                                                <div className="px-6 py-4 overflow-hidden ">
                                                    {/*<img src={this.state.image.base64encoded} alt={this.state.image.name} className="max-h-52"/>*/}
                                                    <ModalImage
                                                        small={image.base64encoded}
                                                        large={image.base64encoded}
                                                        alt={image.name}
                                                        onClick={() => this.handleOpenLigthbox(1)}
                                                        hideDownload="false"
                                                        className="h-60 object-cover rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div id={containerId}>
                                            <div
                                                className="text-xs/[6px] bg-gray-400 border border-gray-300 py-4 rounded-b-lg rounded-t-lg cursor-move mx-6 text-center flex justify-center"
                                                draggable="true"
                                                onDragStart={(e) => this.onDragStart(e, image.id)}
                                                id={image.id}>
                                                <div className="font-bold text-white">{image.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                    </div>
                </div>
            </main>
        );

    };

    componentDidMount() {
        this.getAllOrders();
        this.getAllImages();
    }

    render() {

        return (
            <div>
                {UserUtils.isSuperUser() === false ? <Navigate to="/backend"/> : this.showOrderAndImageData()}
            </div>
        );
    }

}

export default BackendOrderAddImages;
