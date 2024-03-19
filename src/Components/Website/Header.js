import React from 'react';
import HeaderPic from './ImagesFiles/header_8.png';
import Topnavi from './Topnavi';

const Header = () => {

        return (
            <main>
                <div
                    className="grid items-end overflow-hidden relative min-h-screen motion-safe:lg:animate-fade-in motion-safe:lg:animation-delay-300">
                    {<Topnavi />}
                    <picture>
                        <img
                            className="absolute md:h-auto md:w-auto sm:h-auto sm:w-auto inset-0 object-cover  object-center"
                             src={HeaderPic}
                             alt="" loading=""/>
                    </picture>
                </div>
            </main>
        );

}

export default Header;