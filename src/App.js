import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Backend from './Components/Content/Backend/Backend';
import Homepage from './Components/Content/Homepage';
import {RequireToken} from "./Components/Website/Auth";
import Login from "./Components/Website/Login";
import BackendUserCreate from "./Components/Content/Backend/BackendUserCreate";
import BackendUserAddress from "./Components/Content/Backend/BackendUserAddress";
import BackendOrderCreate from "./Components/Content/Backend/BackendOrderCreate";
import BackendOrderDetail from "./Components/Content/Backend/BackendOrderDetail";
import BackendListSwitch from "./Components/Content/Backend/BackendListSwitch";

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
                            <BackendListSwitch type={'user'}/>
                        </RequireToken>
                    }/>
                    <Route path="/backend/order/list" element={
                        <RequireToken>
                            <BackendListSwitch type={'order'}/>
                        </RequireToken>
                    }/>
                    <Route path="/backend/order/detail" element={
                        <RequireToken>
                            <BackendOrderDetail/>
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
