import React from 'react';
import Header_Pic from './images/header_8.png';
import Topnavi from './Topnavi';

const Header = () => {

        return (
            <main className="xl:relative">
                <div className="grid items-end overflow-hidden relative md:min-h-screen motion-safe:lg:animate-fade-in motion-safe:lg:animation-delay-300">
                    {<Topnavi />}
                    <picture>
                        <img className="absolute h-full inset-0 object-cover w-full object-center"
                             src={Header_Pic}
                             alt="" loading=""/>
                    </picture>
                </div>
            </main>
        );

}

export default Header;