import React from 'react';
import '../styles/Main.scss'
import LoginFormComponent from './LoginForm';
import RegisterFormComponent from './RegisterForm';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomeComponent from './Home';
import ProfileComponent from './Profile';
import LogoutComponent from '../utils/Logout';
import ChangePasswordComponent from './ChangePassword';
const MainComponent = () => {
    return (
        <div className='main'>
            <Routes>
                <Route path = "/profile" element={<ProfileComponent/>}/>
                <Route path="/login" element={<LoginFormComponent/>}/>
                <Route path = "/register" element = {<RegisterFormComponent/>}/>
                <Route path = "/logout" element = {<LogoutComponent/>}/>
                <Route path = "/changepassword" element = {<ChangePasswordComponent/>}/>
                <Route path = "/" element={<HomeComponent/>}/>
            </Routes>
        </div>
    );
};

export default MainComponent;