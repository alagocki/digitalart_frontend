import React from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import SubnaviBackendStandard from "../../Website/Backend/SubnaviBackendStandard";
import {url as api_url} from "../../Website/Constants";
import {fetchToken} from "../../Website/Auth";
import axios from "axios";
import {Accordion, AccordionHeader, AccordionBody,} from "@material-tailwind/react";
import UploadPic from "../../Website/ImagesFiles/plus.png";
import Button from "../../Website/Form/Button";
import {Navigate} from "react-router-dom";
import UserUtils from "../../Website/User/UserUtils";
import OrderUtils from "../../Website/Order/OrderUtils";

class BackendOrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderData: [],
            // imageData: [],
            selectedFile: [],
            error: false,
            boxinfo: '',
            selectedImagesCustomer: 0,
            selectedId: 0,
            cntOrderedImages: 0,
            allImages: []
        };

    }

    updateSelectedImagesCustomer = (type, id) => {
        let cnt;
        let setOrdered = false;
        if (type === 'plus') {
            cnt = this.state.selectedImagesCustomer + 1;
            this.setState(
                {
                    selectedImagesCustomer: cnt
                }
            );
            setOrdered = true;
        } else {
            cnt = this.state.selectedImagesCustomer - 1;
            this.setState(
                {
                    selectedImagesCustomer: cnt
                }
            );
        }

        // eslint-disable-next-line array-callback-return
        this.state.imageData.map((data) => {
            Object.keys(data).map(() => {
                if (data[0].id === id) {
                    data[0].ordered = setOrdered;
                }
                return data;
            });
        });

        return cnt;
    }

    // handleFieldChangeFile = (inputFieldId, inputFieldValue) => {
    //     this.setState(prevState => ({
    //         selectedFile: [...prevState.selectedFile, inputFieldValue]
    //     }))
    // }

    euroPrice = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });

    getOrderId = () => {
        const queryParameters = new URLSearchParams(window.location.search)
        return queryParameters.get("order")
    }

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

    getTotapPrice = () => {
        let total;
        let additionalPic = 0;
        if (this.state.selectedImagesCustomer > this.state.orderData.include_media) {
            additionalPic = this.state.selectedImagesCustomer - this.state.orderData.include_media;
        }
        total = this.state.orderData.basic_price + (additionalPic * this.state.orderData.additional_pic_price);
        return total;
    }

    handleSubmit = () => {

        try {

            // let imageData = [];
            const orderId = this.getOrderId();
            const url = api_url + 'order/update/' + orderId;
            const axiosConfig = {
                headers: {
                    'Authorization': 'Bearer ' + fetchToken()
                }
            };
            //
            // imageData = this.state.imageData;
            // if (this.state.selectedFile.length > 0) {
            //     imageData = OrderUtils.prepareImageDataNew(this.state.selectedFile);
            // } else {
            //     imageData = OrderUtils.prepareImageDataStock(this.state.imageData);
            // }
            //
            //
            // console.log(imageData);


            const timer = setTimeout(() => {

                const orderDataUpdate = OrderUtils.orderDataForApi(this.state, 'update');

                axios.post(url, orderDataUpdate, axiosConfig)
                    .then(
                        () => this.reload()
                    )
                    .catch(error => {
                        console.error(error)
                        let infoMessage = error.message;
                        if (error.response.status === 422) {
                            infoMessage = 'Incorrect Order (Status 422)';
                        }
                        this.setState({boxinfo: infoMessage, error: true, code: error.response.status});
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
                                                <div className="w-full mt-14 text-xs">
                                                    <Button
                                                        label="Update Order"
                                                        onClick={this.handleSubmit}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-gray-700 text-base">
                                                    {this.state.orderData.topic}<br/>
                                                    {this.state.orderData.info}<br/>
                                                    {this.getFormattedDate()}<br/>
                                                    {this.state.orderData.condition}
                                                </p>
                                            </div>
                                            <div className="w-1/3">
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td className="w-1/2 text-right pr-4">{this.euroPrice.format(this.state.orderData.basic_price)}</td>
                                                        <td>basic Price</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-1/2 text-right pr-4">{this.euroPrice.format(this.state.orderData.additional_pic_price)}</td>
                                                        <td>each additional image</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-1/2 text-right pr-4 text-gray-500">{this.state.orderData.include_media}</td>
                                                        <td className="text-gray-500">images included</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-1/2 text-right pr-4 border-b border-amber-950 text-gray-500">{this.state.selectedImagesCustomer}</td>
                                                        <td className="border-b border-amber-950 text-gray-500">selected
                                                            images
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-1/2 text-right pr-4 border-b border-amber-950">
                                                            {(this.state.selectedImagesCustomer > this.state.orderData.include_media) ?
                                                                (this.state.selectedImagesCustomer - this.state.orderData.include_media) : 0}</td>
                                                        <td className="border-b border-amber-950">images to be
                                                            calc.
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-1/2 text-right pr-4">{this.euroPrice.format(this.getTotapPrice())}</td>
                                                        <td>total price</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="px-6">
                                            <Accordion open={this.state.open === 1}>
                                                <AccordionHeader onClick={() => this.handleOpen(1)} className="flex">
                                                    <div className="w-full flex justify-end text-xs/[10px]">
                                                        <img className="w-10"
                                                             src={UploadPic}
                                                             alt="" loading=""/>
                                                    </div>
                                                </AccordionHeader>
                                                <AccordionBody>
                                                    File assignment
                                                    {/*<InputFile*/}
                                                    {/*    id="selectedFile"*/}
                                                    {/*    label="Files"*/}
                                                    {/*    customer="true"*/}
                                                    {/*    onChange={this.handleFieldChangeFile}*/}
                                                    {/*    value={this.state.selectedFile}/>*/}
                                                </AccordionBody>
                                            </Accordion>
                                        </div>
                                        {/*<div className="w-full grid md:grid-cols-3 md:gap-3 sm:grid-cols-1 sm:gap-1">*/}
                                        {/*    {*/}
                                        {/*        this.state.imageData.map((data, key) => {*/}
                                        {/*            let elementList = '';*/}
                                        {/*            // eslint-disable-next-line array-callback-return*/}
                                        {/*            Object.keys(data).map(() => {*/}
                                        {/*                elementList = <ImageItem*/}
                                        {/*                    id={data[0].id}*/}
                                        {/*                    key={key}*/}
                                        {/*                    image={data[0]}*/}
                                        {/*                    selectedImagesCustomer={this.state.selectedImagesCustomer}*/}
                                        {/*                    orderId={this.getOrderId()}*/}
                                        {/*                    ordered={data[0].ordered}*/}
                                        {/*                    onChangePlus={() => this.updateSelectedImagesCustomer('plus', data[0].id)}*/}
                                        {/*                    onChangeMinus={() => this.updateSelectedImagesCustomer('minus', data[0].id)}*/}
                                        {/*                />*/}
                                        {/*            });*/}
                                        {/*            return elementList;*/}
                                        {/*        })*/}
                                        {/*    }*/}
                                        {/*</div>*/}
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
        OrderUtils.getOrderById(this.getOrderId()).then(r => {
            this.setState({
                orderData: r.order[0],
                // imageData: r.order[1],
                boxinfo: 'Order ' + this.state.orderData.order_number
            })

            this.setState({
                // selectedImagesCustomer: OrderUtils.getOrderedImages(this.state.imageData)
            })
        })

    }

    render() {

        return (
            <div>
                {UserUtils.isSuperUser() === false ? <Navigate to="/backend"/> : this.fetchOrderData()}
            </div>
        );
    }

}

export default BackendOrderDetail;
