import React from "react";
import BackendHeader from "../../Website/Backend/BackendHeader";
import SubnaviBackendStandard from "../../Website/Backend/SubnaviBackendStandard";


class BackendUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getBackendUser = () => {
    return (
        <main className="pt-20">
            <div className='flex justify-center max-w-7xl flex-col mx-auto w-full'>
                {<BackendHeader/>}
                {<SubnaviBackendStandard type={'user'}/>}
                <h1 className="mb-4 mt-2 text-lg font-extrabold leading-none tracking-tight text-gray-300 md:text-2xl lg:text-3xl">User</h1>
            </div>
        </main>
    );
    }

    render() {
        return (
            <div>
                {this.getBackendUser()}
            </div>
        );
    }

}

export default BackendUser;