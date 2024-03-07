import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {removeToken} from "../Auth";
import UserUtils from "../User/UserUtils";

const TopnaviBackendAdmin = () => {

    const [isOpenImages, setOpenImages] = useState(false);
    const [isOpenOrders, setOpenOrders] = useState(false);
    const [isOpenUser, setOpenUser] = useState(false);
    const navigate = useNavigate();
    const handleDropDownImages = () => {
        setOpenImages(!isOpenImages);
        setOpenOrders(false);
        setOpenUser(false)
    };
    const handleDropDownOrders = () => {
        setOpenImages(false);
        setOpenOrders(!isOpenOrders);
        setOpenUser(false);
    };
    const handleDropDownUser = () => {
        setOpenImages(false);
        setOpenOrders(false);
        setOpenUser(!isOpenUser);
    };
    const signOut = () => {
        removeToken();
        UserUtils.removeUser();
        navigate("/");
    }

    const getNavi = () => {
        return (

            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-white md:dark:bg-white dark:border-gray-700">
                        <li>
                            <a href="/"
                               className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:text-gray-500 md:p-0 md:dark:text-gray-500 dark:bg-gray-400 md:dark:bg-transparent"
                               aria-current="page">Home</a>
                        </li>
                        <li>
                            <button id="dropdownNavbarLink"
                                    data-dropdown-toggle="dropdownNavbar"
                                    onClick={handleDropDownImages}
                                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-500 md:dark:hover:text-blue-500 dark:focus:text-blue-400 dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Images
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <div id="dropdownNavbar" className={`z-10 ${isOpenImages ? "block" : "hidden"}`}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-500"
                                    aria-labelledby="dropdownLargeButton">
                                    <li className="py-1">
                                        <a href="/backend/image/list"
                                           className="blockpy-2 hover:text-blue-100 dark:hover:text-blue-600">List</a>
                                    </li>
                                    <li className="py-1">
                                        <a href="/backend/image/upload"
                                           className="blockpy-2 hover:text-blue-100 dark:hover:text-blue-600">Upload</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <button id="dropdownNavbarLink"
                                    data-dropdown-toggle="dropdownNavbar"
                                    onClick={handleDropDownOrders}
                                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-500 md:dark:hover:text-blue-500 dark:focus:text-blue-400 dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Orders
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <div id="dropdownNavbar" className={`z-10 ${isOpenOrders ? "block" : "hidden"}`}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-500"
                                    aria-labelledby="dropdownLargeButton">
                                    <li className="py-1">
                                        <a href="/backend/order/list"
                                           className="blockpy-2 hover:text-blue-100 dark:hover:text-blue-600">List</a>
                                    </li>
                                    <li className="py-1">
                                        <a href="/backend/order/create"
                                           className="blockpy-2 hover:text-blue-100 dark:hover:text-blue-600">Create</a>
                                    </li>
                                    <li className="py-1">
                                        <a href="/backend/order/add-images"
                                           className="blockpy-2 hover:text-blue-100 dark:hover:text-blue-600">Add
                                            Images</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <button id="dropdownNavbarLink"
                                    data-dropdown-toggle="dropdownNavbar"
                                    onClick={handleDropDownUser}
                                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-500 md:dark:hover:text-blue-500 dark:focus:text-blue-400 dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">User
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <div id="dropdownNavbar" className={`z-10 ${isOpenUser ? "block" : "hidden"}`}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-500"
                                    aria-labelledby="dropdownLargeButton">
                                    <li className="py-1">
                                        <a href="/backend/user/list"
                                           className="blockpy-2 hover:text-blue-100 dark:hover:text-blue-600">List</a>
                                    </li>
                                    <li className="py-1">
                                        <a href="/backend/user/create"
                                           className="blockpy-2 hover:text-blue-100 dark:hover:text-blue-600">Create</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="top-0 z-10 w-full">
            <div className="flow-root">

                <nav className="float-right bg-transparent md:items-center">
                    {getNavi()}
                </nav>
                <div className="flow-left text-left mt-4 ml-2 text-sm ">
                    {UserUtils.getUser()['forename'] + ' ' + UserUtils.getUser()['lastname']}&nbsp;|&nbsp;
                    <button className="hover:text-cyan-500 text-blue-400"
                            onClick={signOut}>Logout
                    </button>
                </div>
            </div>
        </div>);
}

export default TopnaviBackendAdmin;