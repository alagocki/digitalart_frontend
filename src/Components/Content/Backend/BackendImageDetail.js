import React from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import {Navigate} from "react-router-dom";
import UserUtils from "../../Website/User/UserUtils";

class BackendImageDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boxinfo: '',
            error: ''
        };
    }


    fetchImageData = () => {

        return (
            <main className="pt-20">
                <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                    {<BackendHeader/>}

                    <h1 className="mb-10 mt-2 text-lg leading-none tracking-tight text-gray-400 md:text-2xl lg:text-3x">
                        Order Detail
                    </h1>
                    <div className="flex justify-center">

                        <div className="mt-4 border m-3 border-white rounded-b-lg rounded-t-lg shadow-xl w-full">
                            <div className="">
                                <div className="text-gray-400 text-xl mb-2 bg-gray-300 px-6 py-4 flex rounded-t-lg">
                                    <div>{(this.state.error === true) ?
                                        <div
                                            className="text-red-800">{this.state.boxinfo}</div> : this.state.boxinfo}
                                    </div>
                                </div>

                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        );

    };

    componentDidMount() {
        this.setState({
            boxinfo: 'Single Image Data'
        })
    }

    render() {

        return (
            <div>
                {UserUtils.isSuperUser() === false ? <Navigate to="/backend"/> : this.fetchImageData()}
            </div>
        );
    }

}

export default BackendImageDetail;
