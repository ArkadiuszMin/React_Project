import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/Profile.scss'
import ProfileService from '../services/ProfileService';
import { useNavigate } from 'react-router-dom';

const ProfileComponent = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        let token = localStorage.getItem("token")
        if(!token){
            return navigate("/")
        }
        ProfileService.checkUser()
            .then((res) => {
                if(res.data.status=="OK"){
                    setUser(res.data.user)
                    console.log(user)
                }
                else{
                    alert("ERROR OCCURED")
                    navigate("/")
                }
            })

    }, [])



    return (
        <div className='profile'>
            <h1> Welcome {user.username}! </h1>
            <h3>ID: {user.id}</h3>
            <h3>email: {user.email}</h3>
            <h3>place: (place)</h3>
            <div className='change'>Change password</div>
            
        </div>
    );
};

export default ProfileComponent;