import React from 'react';
import '../styles/Main.scss'
import LoginFormComponent from './LoginForm';
import RegisterFormComponent from './RegisterForm';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomeComponent from './Home';
import ProfileComponent from './Profile';
const MainComponent = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path = "/profile" element={<ProfileComponent/>}/>
                <Route path="/login" element={<LoginFormComponent/>}/>
                <Route path = "/register" element = {<RegisterFormComponent/>}/>
                <Route path = "/" element={<HomeComponent/>}/>
            </Routes>
        </div>
    );
};

export default MainComponent;