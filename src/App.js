import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Backend from './Components/Content/backend/Backend';
import Homepage from './Components/Content/Homepage';
import {RequireToken} from "./Components/website/Auth";
import Login from "./Components/website/Login";
import BackendUser from "./Components/Content/backend/BackendUser";
import BackendUserCreate from "./Components/Content/backend/BackendUserCreate";
import BackendUserList from "./Components/Content/backend/BackendUserList";

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
                    <Route path="/backend/user" element={
                        <RequireToken>
                            <BackendUser/>
                        </RequireToken>
                    }/>
                    <Route path="/backend/user/create" element={
                        <RequireToken>
                            <BackendUserCreate/>
                        </RequireToken>
                    }/>
                    <Route path="/backend/user/list" element={
                        <RequireToken>
                            <BackendUserList/>
                        </RequireToken>
                    }/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
