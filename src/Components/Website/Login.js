import {useNavigate} from "react-router";
import {setToken} from "./Auth";
import React, {useState} from "react";
import axios from "axios";
import Header_Pic from './ImagesFiles/header_backend.png';
import {url as api_url} from ".//Constants";
import UserUtils from "./User/UserUtils";

const Login = () => {
    // const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    // check to see if the fields are not empty
    const get_token = async () => {
        if ((username !== "") && (password !== "")) {
            let url = api_url + 'login';
            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    username: username,
                    password: password
                }
            };

            try {
                const response = await axios(options);
                if (response.data.access_token) {
                    setToken(response.data.access_token);
                    await UserUtils.setUser()

                    const timer = setTimeout(() => {
                        navigate("/backend");
                    }, 1000);
                    return () => clearTimeout(timer);


                } else {
                    console.error('ERROR: ' + response.status);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };


    return (

        <div className="bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex items-center mb-1 text-2xl font-semibold text-blue-950">
                    <img className="inset-0 object-cover object-center w-96"
                         src={Header_Pic}
                         alt="" loading=""/>
                </a>
                <div
                    className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-slate-300 border-gray-700 border">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-950 md:text-2xl">
                            Anmelden
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-blue-950">Deine
                                    Email Adresse</label>
                                <input type="email" name="email" id="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       onChange={(e) => setUsername(e.target.value)}
                                       placeholder="name@company.com" required=""/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-blue-950">Deim Passwort</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       onChange={(e) => setPassword(e.target.value)}
                                       required=""/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        {/*<input id="remember" aria-describedby="remember" type="checkbox"*/}
                                        {/*       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"*/}
                                        {/*       required=""/>*/}
                                    </div>
                                    <div className="ml-3 text-sm">
                                        {/*<label htmlFor="remember" className="text-gray-500">Remember*/}
                                        {/*    me</label>*/}
                                    </div>
                                </div>
                                <a href="/"
                                   className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Password
                                    vergessen?</a>
                            </div>
                            <button type="button"
                                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-blue-950 border-gray-600 placeholder-blue-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    onClick={get_token}
                            >Anmelden
                            </button>
                            <div className="flex justify-between">
                                <p className="text-sm font-light text-gray-500">
                                    Don’t have an account yet? <a href="/register"
                                                                  className="font-medium text-primary-600 hover:underline">Sign
                                    up</a>

                                </p>
                                <p className="text-sm font-light text-gray-500">
                                    <a href="/" className="font-medium text-primary-600 hover:underline">Home</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        // <div style={{minHeight: 800, marginTop: 30}}>
        //     <h1>login page</h1>
        //     <div style={{marginTop: 30}}>
        //         {fetchToken() ? (
        //             <p>you are logged in</p>
        //         ) : (
        //             <div>
        //                 <form>
        //                     <label style={{marginRight: 10}}>Input Username</label>
        //                     <input
        //                         type="text"
        //                         onChange={(e) => setUsername(e.target.value)}
        //                     />
        //
        //                     <label style={{marginRight: 10}}>Input Password</label>
        //                     <input
        //                         type="text"
        //                         onChange={(e) => setPassword(e.target.value)}
        //                     />
        //
        //                     <button type="button" onClick={get_token}>
        //                         Login
        //                     </button>
        //                 </form>
        //             </div>
        //         )}
        //     </div>
        // </div>


    )
        ;
}

export default Login;