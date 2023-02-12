import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import '../styles/RegisterForm.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/AuthService';
const RegisterFormComponent = () => {
    const {register, handleSubmit, formState: { errors }, watch} = useForm();
    const [diffPasswords, setDiffPasswords] = useState(false);
    const navigate = useNavigate();
    const onSubmit = (data) => {
        AuthService.register(data)
            .then((res) => {
                if(res.data.status == "err"){
                    alert(res.data.err)
                }
                else{
                    navigate("/login");
                }
            });
        
    }
    return (
        <div className='registerForm'>
            <form onSubmit = {handleSubmit(onSubmit)} className="form">
                <div className='form_register'>Register</div>
                <div className='form_box'>
                    <label className='form_box-label'>Username</label>
                    <input {...register("username", {
                        required: true
                    })}/>
                </div>
                <div className='form_box'>
                    <label className='form_box-label'>password</label>
                    <div className='form_box-input'>
                        <input type="password" {...register("password", {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                        })}/>
                        {errors.password && <p>Password must cotain 6 - 15 characters, number and capital letter</p>}
                    </div>
                    
                </div>
                
                <div className='form_box'>
                    <label className='form_box-label'>Repeat password</label>
                    <div className='form_box-input'>
                        <input type="password" {...register("repeatPassword", {
                            required: true,
                            validate: (value) => {
                                if (value != watch("password")){
                                    setDiffPasswords(true);
                                    return "Your passwords should match"
                                    
                                }
                                else{
                                    setDiffPasswords(false);
                                    return
                                }
                            }
                        })}/>
                        <p style={ diffPasswords ? {display: 'contents'} : {display: 'none'}}>Passwords don't match</p>
                    </div>
                    
                </div>
                <div className='form_box'>
                    <label className='form_box-label'>email</label>
                    <div className='form_box-input'>
                        <input {...register("email", {
                            required: true,
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}/>
                        {errors.email && <p>Check your email</p>}
                    </div>
                    
                </div>
                <input type="submit" className='form_submit'/>


            </form>
            
        </div>
    );
};

export default RegisterFormComponent;