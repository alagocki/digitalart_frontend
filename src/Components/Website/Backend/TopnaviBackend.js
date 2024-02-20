import React from 'react';
import {useNavigate} from "react-router";
import {removeToken} from "../Auth";
import UserUtils from "../User/UserUtils";
import {getCurrentPath} from "./NaviHelper";

const TopnaviBackend = () => {

    const navigate = useNavigate();

    const signOut = () => {
        removeToken();
        UserUtils.removeUser();
        navigate("/");
    }

    const getNavi = () => {
        let navi;

        if (UserUtils.isSuperUser() === true) {
            navi = (
                <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                    <li className="md:my-0 p-2 mr-1">
                        <a href="/" className="text-xl hover:text-cyan-500">Home</a>
                    </li>
                    <li>|</li>
                    <li className={(getCurrentPath().includes('image')) ? "md:my-0 p-2 mr-1 text-blue-500" : "md:my-0 p-2 mr-1"}>
                        <a href="/backend/image/list" className="text-xl hover:text-cyan-500">Images</a>
                    </li>
                    <li>|</li>
                    <li className={(getCurrentPath().includes('order')) ? "md:my-0 p-2 mr-1 text-blue-500" : "md:my-0 p-2 mr-1"}>
                        <a href="/backend/order/list" className="text-xl hover:text-cyan-500">Order</a>
                    </li>
                    <li>|</li>
                    <li className={(getCurrentPath().includes('user')) ? "md:my-0 p-2 mr-1 text-blue-500" : "md:my-0 p-2 mr-1"}>
                        <a href="/backend/user/list" className="text-xl hover:text-cyan-500">User</a>
                    </li>
                </ul>);
        } else {
            navi = (
                <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                    <li className="md:my-0 p-2 mr-1">
                        <a href="/" className="text-xl hover:text-cyan-500">Home</a>
                    </li>
                    <li>|</li>
                    <li className={(getCurrentPath().includes('order')) ? "md:my-0 p-2 mr-1 text-blue-500" : "md:my-0 p-2 mr-1"}>
                        <a href="/backend/order/list" className="text-xl hover:text-cyan-500">Order</a>
                    </li>
                    <li>|</li>
                    <li className="md:my-0 p-2 mr-1">
                        <a href="/backend/user/list" className="text-xl hover:text-cyan-500 duration-500">User</a>
                    </li>
                    <li>|</li>
                    <li className="md:my-0 p-2 mr-1">
                        <a href="/" className="text-xl hover:text-cyan-500 duration-500">Kontakt</a>
                    </li>
                </ul>);
        }

        return navi;

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
        </div>
    );
}

export default TopnaviBackend;