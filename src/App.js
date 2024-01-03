import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Backend from './Components/Content/Backend';
import Homepage from './Components/Content/Homepage';
import {RequireToken} from "./Components/website/Auth";
import Login from "./Components/website/Login";

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
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
