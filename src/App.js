import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Backend from './Components/Content/backend/Backend';
import Homepage from './Components/Content/Homepage';
import {RequireToken} from "./Components/website/Auth";
import Login from "./Components/website/Login";
import BackendUserCreate from "./Components/Content/backend/BackendUserCreate";
import BackendUserList from "./Components/Content/backend/BackendUserList";
import BackendUserAddress from "./Components/Content/backend/BackendUserAddress";
import BackendOrderList from "./Components/Content/backend/BackendOrderList";
import BackendOrderCreate from "./Components/Content/backend/BackendOrderCreate";

const App = () => {
    return (
        <div>
            {/*<a href="/">Home |</a>*/}
            {/*<a href="/backend"> Backend</a>*/}
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/backend" element={
                        <RequireToken>
                            <Backend/>
                        </RequireToken>
                    }/>
                    <Route path="/backend/user/create" element={
                        <RequireToken>
                            <BackendUserCreate/>
                        </RequireToken>
                    }/>
                    <Route path="/backend/user/create-address/:createduserid/:createduseremail" element={
                        <RequireToken>
                            <BackendUserAddress/>
                        </RequireToken>
                    }/>
                    <Route path="/backend/user/list" element={
                        <RequireToken>
                            <BackendUserList/>
                        </RequireToken>
                    }/>
                    <Route path="/backend/order/list" element={
                        <RequireToken>
                            <BackendOrderList/>
                        </RequireToken>
                    }/>
                    <Route path="/backend/order/create" element={
                        <RequireToken>
                            <BackendOrderCreate/>
                        </RequireToken>
                    }/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
