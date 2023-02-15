import React from 'react';
import '../styles/Navbar.scss'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { logedContext } from '../App';
const NavbarComponent = () => {
    const navigate = useNavigate();
    const {loged, setLoged} = useContext(logedContext);
    return (
    <div className='navbar'>
        <div className='container'>
            <div className='container_logo' onClick={() => navigate("/")}>Tripseratops</div>
            <div className='container_buttons'>
                {(!loged) && <div className='container_buttons-single' onClick = {() => navigate("/login")}>Login</div>}
                {(!loged) && <div className='container_buttons-single' onClick = {() => navigate("/register")}>Register</div>}
                {(loged) && <div className='container_buttons-single' onClick = {() => navigate("/profile")}>Profile</div>}
                {(loged) && <div className='container_buttons-single' onClick = {() => navigate("/logout")}>Logout</div>}
            </div>
        </div>
    </div>
        
    );
};

export default NavbarComponent;