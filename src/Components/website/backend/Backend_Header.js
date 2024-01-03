import React from 'react';
import Header_Pic from '../images/header_backend.png';
import Topnavi_Backend from "./Topnavi_Backend";
import Topnavi from "../Topnavi";

const Backend_Header = () => {

        return (
            // <div className="xl:relative">
            //     <div
            //         className="grid items-end overflow-hidden relative md:min-h-screen motion-safe:lg:animate-fade-in motion-safe:lg:animation-delay-300 place-content-center">
            //         <div className="border-2 border-amber-200">
            //             <picture>
            //                 <img className="absolute inset-0 object-cover object-center"
            //                      src={Header_Pic}
            //                      alt="" loading=""/>
            //             </picture>
            //         </div>
            //     </div>
            // </div>


            <main className="pt-20">
                <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                    <h2 className="text-5xl font-semibold tracking-tight text-center text-gray-700">
                                     <picture>
                                         <img className="inset-0 object-cover object-center"
                                              src={Header_Pic}
                                              alt="" loading=""/>
                                     </picture>
                    </h2>
                    <p className="text-sm text-gray-700 text-right border-t-gray-180 border-t-2 border-b-gray-180 border-b-2">{<Topnavi_Backend />}</p>
                    <p className="mt-8 text-sm text-gray-700">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                        been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also
                        the leap
                        into electronic typesetting, remaining essentially unchanged. It was popularised in the
                        1960s with the
                        release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                        publishing
                        software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </main>
);

}

export default Backend_Header;