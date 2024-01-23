import React from 'react';
import {isSuperUser} from "../User/User";
import {getCurrentPath} from "./NaviHelper";


const SubnaviOrderBackend = () => {

    const getSubnaviOrderBackend = () => {
        return (
            <div className="top-0 z-10 w-full">
                <div className="flex justify-end">
                    <nav className="bg-transparent md:flex md:items-center flex md:justify-between">
                        <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-0 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                            {(isSuperUser() === true) ?
                                <li className={(getCurrentPath().includes('order/create')) ? "md:my-0 p-2 ml-0.5 flex text-blue-500 font-medium" : "md:my-0 p-2 ml-0.5 flex"}>
                                    <a href="/backend/order/create"
                                       className="text-sm hover:text-cyan-500 bg-gray-200 p-1.5 rounded-t-lg rounded-r-lg rounded-b-lg rounded-l-lg w-20 text-center">Create</a>
                                </li> : null}
                            <li className={(getCurrentPath().includes('order/list')) ? "md:my-0 p-2 ml-0.5 flex text-blue-500 font-medium" : "md:my-0 p-2 ml-0.5 flex"}>
                                <a href="/backend/order/list"
                                   className="text-sm hover:text-cyan-500 bg-gray-200 p-1.5 rounded-t-lg rounded-r-lg rounded-b-lg rounded-l-lg w-20 text-center">List</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }

    return (
        <div>
            {getSubnaviOrderBackend()}
        </div>
    )

}

export default SubnaviOrderBackend;