import React from 'react';
import '../styles/Navbar.scss'
import { useNavigate } from 'react-router-dom';
const NavbarComponent = () => {
    const navigate = useNavigate();
    return (
    <div className='navbar'>
        <div className='container'>
            <div className='container_logo' onClick={() => navigate("/")}>Tripseratops</div>
            <div className='container_buttons'>
                <div className='container_buttons-single' onClick = {() => navigate("/login")}>Login</div>
                <div className='container_buttons-single' onClick = {() => navigate("/register")}>Register</div>
            </div>
        </div>
    </div>
        
    );
};

export default NavbarComponent;