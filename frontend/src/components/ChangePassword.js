import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '../styles/ChangePassword.scss'
import ProfileService from '../services/ProfileService';
import { useNavigate } from 'react-router-dom';
const ChangePasswordComponent = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors }, watch} = useForm();
    const [diffPasswords, setDiffPasswords] = useState(false);
    let onSubmit = (data) => {
        ProfileService.changePassword(data)
            .then((res) => {
                if(res.data.status == "OK"){
                    alert("You succesfully changed your password")
                    navigate("/profile")
                }
                else{
                    alert("Something went wrong")
                }
            })

    } 
    return (
        <div className='changepassword'>
            <form onSubmit = {handleSubmit(onSubmit)} className="form">
                <div className='form_changepassword'>Change Password</div>
                <div className='form_box'>
                    <label className='form_box-label'>Current Password</label>
                    <input {...register("password", {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                    })}type="password" className='form_box-input'/>
                    {errors.password && <p>Password must cotain 6 - 15 characters, number and capital letter</p>}
                </div>
                <div className='form_box'>
                    <label className='form_box-label'>New password</label>
                    <input {...register("newpassword", {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                    })}type="password" className='form_box-input'/>
                    {errors.password && <p>Password must cotain 6 - 15 characters, number and capital letter</p>}
                </div>
                <div className='form_box'>
                    <label className='form_box-label'>Repeat new password</label>
                    <input {...register("repnewpassword", {
                        required: true,
                        validate: (value) => {
                            if(value!=watch("newpassword")){
                                setDiffPasswords(true)
                                return "Your passwords should match"
                            }
                            setDiffPasswords(false)
                            return
                        }
                    })}type="password" className='form_box-input'/>
                    <p style = {diffPasswords ? {display: 'contents'} : {display: 'none'}}>Password must cotain 6 - 15 characters, number and capital letter</p>
                </div>
                <input type="submit" className='form_submit'/>
            </form>
        </div>
    );
};

export default ChangePasswordComponent;