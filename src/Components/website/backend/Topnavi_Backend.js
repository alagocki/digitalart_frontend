import React from 'react';
import {useNavigate} from "react-router";

const Topnavi_Backend = () => {

    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("hpknzAfSPmfI8AAI");
        navigate("/");
    }

    return (
        <div className="top-0 z-10 w-full">
            <div className="flex justify-end">
                <nav className="bg-transparent md:flex md:items-center flex md:justify-between">
                    <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                        <li className="md:my-0 p-2 mr-1">
                            <a href="#" className="text-xl hover:text-cyan-500 duration-500">Kontakt</a>
                        </li>
                        <li>|</li>
                        <li className="md:my-0 p-2 ml-1">
                            <button className="text-xl hover:text-cyan-500 duration-500"
                                    onClick={signOut}>Logout
                            </button>
                        </li>

                        <h2></h2>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Topnavi_Backend;