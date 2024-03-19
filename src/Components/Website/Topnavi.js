import React from 'react';
import LogoImage from './ImagesFiles/Logo_4.png';

const Topnavi = () => {

    let link = <a href="/login"
                  className="text-sm md:text-xl hover:text-cyan-500 duration-500 hidden md:block">Login</a>;
    const login_link = () => {
        if (localStorage.getItem("hpknzAfSPmfI8AAI") !== null) {
            link = <a href="/backend" className="text-sm md:text-xl hover:text-cyan-500 duration-500">Konto</a>;
        }
        return link
    }


    return (
        <div className="absolute top-0  py-2 z-10 w-full mb-10">
            <div className="flex lg:mr-10 justify-between">
                <nav className="bg-transparent items-center flex ml-1 md:ml-12 mt-1 md:mt-0">
                    <ul className="flex items-center z-auto  left-0 w-auto opacity-100 transition-all ease-in duration-500">
                        <li className="mx-1 my-1 md:my-0 p-1">
                            {login_link()}
                        </li>
                        <li className="hidden md:block">|</li>
                        <li className="mx-1 my-1 md:my-0 p-1">
                            <a href="/" className="text-sm md:text-xl hover:text-cyan-500 duration-500">Kontakt</a>
                        </li>
                    </ul>
                </nav>
                <img className="hidden md:block md:w-96 md:h-20 md:mr-12 "
                     src={LogoImage}
                     alt="Logo Andreas Lagocki Digital Art"/>
            </div>
        </div>
    );
}

export default Topnavi;