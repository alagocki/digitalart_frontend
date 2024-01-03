import {useNavigate} from "react-router";
import {fetchToken, setToken} from "./Auth";
import {useState} from "react";
import axios from "axios";
import api from "../Content/api";
import {saveAs} from 'file-saver';

const Login = () => {
    // const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // check to see if the fields are not empty
    const get_token = async () => {
        if ((username === "") && (password === "")) {
            return;
        } else {

            let url = 'http://localhost:8008/login';
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
                console.log(response.data.access_token);
                if (response.data.access_token) {
                    setToken(response.data.access_token);
                    navigate("/backend");
                } else {
                    console.error('ERROR: ' + response.status);
                }
            } catch (error) {
                console.error(error);
                // const file = new Blob([error], {type: 'text/plain;charset=utf-8'});
                // saveAs(file, 'error.txt');
            }


        }
    };

    return (
        <div style={{minHeight: 800, marginTop: 30}}>
            <h1>login page</h1>
            <div style={{marginTop: 30}}>
                {fetchToken() ? (
                    <p>you are logged in</p>
                ) : (
                    <div>
                        <form>
                            <label style={{marginRight: 10}}>Input Username</label>
                            <input
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <label style={{marginRight: 10}}>Input Password</label>
                            <input
                                type="text"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button type="button" onClick={get_token}>
                                Login
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;