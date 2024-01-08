import React from "react";
import {isSuperUser} from "../../website/User/User";
import BackendHeader from "../../website/backend/BackendHeader";
import SubnaviUserBackend from "../../website/backend/SubnaviUserBackend";


const BackendUser = () => {

    return (
        <main className="pt-20">
            <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                {<BackendHeader/>}
                {<SubnaviUserBackend/>}
                <h1 className="mb-4 mt-2 text-lg font-extrabold leading-none tracking-tight text-gray-300 md:text-2xl lg:text-3xl">User</h1>
            </div>
        </main>
    );

}

export default BackendUser;