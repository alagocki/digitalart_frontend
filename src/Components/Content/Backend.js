import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import Backend_Header from "../website/backend/Backend_Header";

// const Backend = () => {
// const [transctions, setTransactions] = useState([]);
// const [formData, setFormData] = useState({
//     name: "",
//     owner: "",
//     description: "",
// //     status: "",
// //     downloaded: "",
// //     path: "",
// //     upload: ""
// // });
//
// // const fetchTransactions = async () => {
// //     const response = await api.get("/transactions");
// //     console.log(response);
// //     // setTransactions(response.data);
// // };
//
// // useEffect(() => {
// //     fetchTransactions();
// // }, []);
// //
// // const handleInputChange = (event) => {
// //     const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
// //     setFormData({
// //         ...formData,
// //         [event.target.name]: value,
// //     });
// // };
// //
// // const handleFormSubmit = async (event) => {
// //     event.preventDefault();
// //     const response = await api.post("/transactions", formData);
// //     setTransactions();
// //     setFormData({
// //         name: "",
// //         owner: "",
// //         description: "",
// //         status: "",
// //         downloaded: "",
// //         path: "",
// //         upload: ""
// //     });
// // };
//
// return (
//     <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
// );
//
// }

const Backend = () => {



    return (
        <div className="flex flex-col min-h-screen">
            {<Backend_Header />}
            {/*<div className="border-2 border-amber-950 flex items-center justify-center">*/}
            {/*    <div className="mt-auto w-1/2 border-2 border-amber-200 flex justify-end">Navigation</div>*/}
            {/*</div>*/}
            {/*<div className="border-2 border-amber-950 flex items-center justify-center">*/}
            {/*    <div className="mt-auto w-1/2 border-2 border-amber-200 flex">Main content</div>*/}
            {/*</div>*/}
            {/*<div className="border-2 border-amber-950 flex items-center justify-center">*/}
            {/*    <div className="mt-auto w-1/2 border-2 border-amber-200 flex">Footer</div>*/}
            {/*</div>*/}
        </div>
    );


    // return (
    //     <div className="p-4">
    //         <div className="mb-10">
    //             {<AllImages/>}
    //         </div>
    //         <h1>Profile page</h1>
    //         <p>Hello there, welcome to your profile page</p>
    //
    //         <button className="border border-amber-200 rounded-lg bg-slate-500 text-amber-950 p-2" onClick={signOut}>sign out</button>
    //     </div>
    // );

}

export default Backend;