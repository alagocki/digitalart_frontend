import React from "react";

import BackendHeader from "../../website/backend/BackendHeader";
import BackendHome from "./BackendHome";


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
        <main className="pt-20">
            <div className='flex justify-center max-w-7xl flex-col mx-auto'>
                {<BackendHeader/>}
                {<BackendHome/>}
            </div>
        </main>
    );

}

export default Backend;