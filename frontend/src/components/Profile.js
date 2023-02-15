import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/Profile.scss'
import ProfileService from '../services/ProfileService';
import { useNavigate } from 'react-router-dom';

const ProfileComponent = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [changePlace, setChangePlace] = useState(false);
    const [inputValue, setInputValue] = useState("");

    let placeDisplay = () => {
        if(!changePlace){
            return (
                <div className='container_place'>
                    <div className = 'container_box'> <b>place:</b> {user.place}</div>
                    <div className='container_place-change' onClick={() => setChangePlace(!changePlace)}>Change</div>
                </div>
            )
        }
        return(
            <div className='container_place'>
                <input className='container_place-input' value={inputValue} onChange={(event) => {
                    setInputValue(event.target.value)
                    }}/>
                <div className='container_place-change' onClick={()=>{
                    setInputValue("") 
                    setChangePlace(!changePlace)
                    }}>Cancel</div>
                <div className='container_place-change' onClick={() => {
                    ProfileService.changePlace({place: inputValue})
                        .then((res) => {
                            if(res.data.status != "OK") alert("Something went wrong")
                            else checkUser()
                        })
                    
                    setInputValue("")
                    setChangePlace(!changePlace)

                }}>Confirm</div>
            </div>
        )
    }

    useEffect(() => {
        let token = localStorage.getItem("token")
        if(!token){
            return navigate("/")
        }
        checkUser();

        setChangePlace(false)
        setInputValue("")

    }, [])

    let checkUser = () => {
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
    }



    return (
        <div className='profile'>
            <div className='container'>
                <h1> Welcome {user.username}! </h1>
                <div className='container_box'> <b>ID:</b> {user.id} </div>
                <div className='container_box'> <b>email:</b> {user.email} </div>
                {placeDisplay()}
                <div className='container_change' onClick={() => navigate("/changepassword")}>Change password</div>
            </div>
        </div>
    );
};

export default ProfileComponent;