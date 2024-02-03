import React from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import SubnaviBackendStandard from "../../Website/Backend/SubnaviBackendStandard";
import {url as api_url} from "../../Website/Constants";
import {fetchToken} from "../../Website/Auth";
import axios from "axios";
import ImageItem from "../../Website/List/ImageItem";
import {Accordion, AccordionHeader, AccordionBody,} from "@material-tailwind/react";
import UploadPic from "../../Website/Images/upload.png";
import InputFile from "../../Website/Form/InputFile";
import Button from "../../Website/Form/Button";
import {Navigate} from "react-router-dom";
import {isSuperUser} from "../../Website/User/UserService";
import {getOrderById, prepareImageData} from "../../Website/Order/OrderService";

class BackendOrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderData: [],
            imageData: [],
            selectedFile: [],
            error: false,
            boxinfo: '',
        };
    }

    handleFieldChangeFile = (inputFieldId, inputFieldValue) => {
        this.setState(prevState => ({
            selectedFile: [...prevState.selectedFile, inputFieldValue]
        }))
    }

    euroPrice = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });

    getOrderId = () => {
        const queryParameters = new URLSearchParams(window.location.search)
        return queryParameters.get("order")
    }

    // this.getOrderId()

    getFormattedDate = () => {
        const date = new Date(this.state.orderData.shooting_date);
        return date.toLocaleDateString('de-DE')
    }

    handleOpen = (value) => (
        this.setState({
            open: this.state.open === value ? 0 : value
        })
    );

    reload = () => {
        window.location.reload(false)
    }

    handleSubmit = () => {

        try {

            let imageData = [];
            const orderId = this.getOrderId();
            const url = api_url + 'order/images/' + orderId;
            const axiosConfig = {
                headers: {
                    'Authorization': 'Bearer ' + fetchToken()
                }
            };

            imageData = prepareImageData(this.state.selectedFile);

            const timer = setTimeout(() => {

                const img_cnt = imageData.length
                const orderDataUpdate = {
                    topic: '-', //this.state.orderData.topic,
                    info: '-', //this.state.orderData.info
                    order_number: 99999,
                    shooting_date: this.state.orderData.shooting_date,
                    status: 'offen',
                    customer_id: '-', //this.state.orderData.customer_id
                    price: 0, //this.state.orderData.price
                    condition: '-', //this.state.orderData.condition
                    images_cnt: img_cnt,
                    images: imageData
                };

                axios.post(url, orderDataUpdate, axiosConfig)
                    .then(
                        () => this.reload()
                    )
                    .catch(imageError => {
                        console.log(imageError)
                        let infoMessage = imageError.message;
                        if (imageError.response.status === 422) {
                            infoMessage = 'Incorrect Order (Status 422)';
                        }
                        this.setState({boxinfo: infoMessage, error: true, code: imageError.response.status});
                    });
            }, 1000);
            return () => clearTimeout(timer);


        } catch (error) {
            this.setState({info: error.message});
        }

        return null;

    }

    fetchOrderData = () => {

        return (
            <main className="pt-20">
                <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                    {<BackendHeader/>}
                    {<SubnaviBackendStandard type={'order'} sub={'detail'}/>}

                    <h1 className="mb-4 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3xl ">
                        Order Detail
                    </h1>
                    <div className="flex justify-center">
                        {(this.state.orderData.order_number) ?
                            <div className="mt-4 border m-3 border-white rounded-b-lg rounded-t-lg shadow-xl w-full">
                                <div className="">
                                    <div className="text-gray-400 text-xl mb-2 bg-gray-300 px-6 py-4 flex rounded-t-lg">
                                        <div>{(this.state.error === true) ?
                                            <div
                                                className="text-red-800">{this.state.boxinfo}</div> : this.state.boxinfo}
                                        </div>
                                    </div>

                                    <div className="">
                                        <div
                                            className="px-6 py-4 flex justify-between border border-l-white border-t-white border-r-white border-dashed border-b-gray-300">
                                            <div>
                                                <h3 className="text-3xl font-bold text-amber-950">
                                                    {this.state.orderData.lastname},<br/> {this.state.orderData.forename}
                                                </h3>
                                            </div>
                                            <div>
                                                <p className="text-gray-700 text-base">
                                                    {this.state.orderData.topic}<br/>
                                                    {this.state.orderData.info}<br/>
                                                    {this.getFormattedDate()}<br/>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-base text-amber-950">
                                                    {this.euroPrice.format(this.state.orderData.price)}<br/> {this.state.orderData.condition}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="px-6">
                                            <Accordion open={this.state.open === 1}>
                                                <AccordionHeader onClick={() => this.handleOpen(1)} className="flex">
                                                    <div className="w-full flex justify-end">
                                                        <img className="w-10"
                                                             src={UploadPic}
                                                             alt="" loading=""/>
                                                    </div>
                                                </AccordionHeader>
                                                <AccordionBody>
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
                                                </AccordionBody>
                                            </Accordion>
                                        </div>
                                        <div className="w-full grid md:grid-cols-3 md:gap-3 sm:grid-cols-1 sm:gap-1">
                                            {
                                                this.state.imageData.map((data, key) => {
                                                    let elementList = '';
                                                    // eslint-disable-next-line array-callback-return
                                                    Object.keys(data).map(() => {
                                                        elementList = <ImageItem
                                                            id={data[0].id}
                                                            key={key}
                                                            image={data[0]}
                                                        />
                                                    });
                                                    return elementList;
                                                })}
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                <span
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                </div>
                            </div> : <div className="text-gray-400">Data will be loaded</div>}


                    </div>
                </div>
            </main>
        );

    };

    componentDidMount() {
        getOrderById(this.getOrderId()).then(r => {
            this.setState({
                orderData: r.order[0],
                imageData: r.order[1],
                boxinfo: 'Order ' + this.state.orderData.order_number
            })
        })
    }

    render() {

        return (
            <div>
                {isSuperUser() === false ? <Navigate to="/backend"/> : this.fetchOrderData()}
            </div>
        );
    }

}

export default BackendOrderDetail;
