import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {removeToken} from "../Auth";
import {getUser, removeUser} from "../User/User";

const SubnaviUserBackend = () => {



    return (
        <div className="top-0 z-10 w-full">
            <div className="flex justify-end">
                <nav className="bg-transparent md:flex md:items-center flex md:justify-between">
                    <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-0 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                        <li className="md:my-0 p-2 mr-1">
                            <a href="/backend/user/create" className="text-sm hover:text-cyan-500 text-blue-950 duration-500 bg-gray-300 p-1.5 rounded-t-lg rounded-r-lg rounded-b-lg rounded-l-lg">Create</a>
                        </li>
                        <li>|</li>
                        <li className="md:my-0 p-2 mr-1">
                            <a href="#" className="text-sm hover:text-cyan-500 text-blue-950 duration-500 bg-gray-300 p-1.5 rounded-t-lg rounded-r-lg rounded-b-lg rounded-l-lg">List</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default SubnaviUserBackend;