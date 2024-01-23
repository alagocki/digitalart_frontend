import React from 'react';
import LogoImage from './images/Logo_4.png';

const Topnavi = () => {

    let link = <a href="/login" className="text-xl hover:text-cyan-500 duration-500">Login</a>;
    const login_link = () => {
        if (localStorage.getItem("hpknzAfSPmfI8AAI") !== null) {
            link = <a href="/backend" className="text-xl hover:text-cyan-500 duration-500">User</a>;
        }
        return link
    }

    return (
        <div className="absolute top-0 py-2 z-10 w-full mb-10">
            <div className="flex md:right-10 md:justify-end mr-10">
                <nav className="bg-transparent md:flex md:items-center flex md:justify-between">
                    <div className="flex justify-end items-center ">
                        <span className="text-2xl font-[Poppins] cursor-pointer">
                            <img className="h-20 mt-2 mr-24 inline"
                                 src={LogoImage}
                                 alt="Logo Andreas Lagocki Digital Art"/>
                        </span>
                        <span className="text-3xl cursor-pointer mx-2 md:hidden block">
                            <ion-icon name="menu" onclick="Menu(this)"></ion-icon>
                        </span>
                    </div>

                    <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-100 top-[-400px] transition-all ease-in duration-500">
                        <li className="mx-4 my-6 md:my-0 p-2">
                            <a href="#" className="text-xl hover:text-cyan-500 duration-500">Kontakt</a>
                        </li>
                        <li>|</li>

                        <li className="mx-4 my-6 md:my-0 p-2">
                            {login_link()}
                        </li>

                        <h2></h2>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Topnavi;