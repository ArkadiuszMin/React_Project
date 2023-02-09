import React from 'react';
import '../styles/Main.scss'
import LoginFormComponent from './LoginForm';
import RegisterFormComponent from './RegisterForm';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
const MainComponent = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path="/login" element={<LoginFormComponent/>}/>
                <Route path = "/register" element = {<RegisterFormComponent/>}/>
            </Routes>
        </div>
    );
};

export default MainComponent;