import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { logedContext } from '../App';
const LogoutComponent = () => {
    const navigate = useNavigate();
    const {loged, setLoged} = useContext(logedContext);

    useEffect(() => {
        localStorage.removeItem("token")
        setLoged(false);
        navigate("/login")
    }, [])
    return (
        <div>
            
        </div>
    );
};

export default LogoutComponent;