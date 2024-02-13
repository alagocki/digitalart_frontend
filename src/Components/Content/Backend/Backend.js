import React from "react";

import BackendHeader from "../../Website/Backend/BackendHeader";
import BackendHome from "./BackendHome";

const Backend = () => {

    return (
        <main className="pt-20">
            <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                {<BackendHeader/>}
                {<BackendHome/>}
            </div>
        </main>
    );

}

export default Backend;