import React from 'react';
import '../styles/loginForm.scss'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
const LoginFormComponent = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        AuthService.login(data)
        navigate("/");
    }

    return (
        <div className="loginform">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className='form_login'>Login</div>
                <div className='form_box'>
                    <label className='form_box-label'>Email</label>
                    <input {...register('email')}/>
                </div>
                <div className='form_box'>
                    <label className='form_box-label'>Password</label>
                    <input {...register('password')} type="password"/>
                </div>
                
                <input type='submit'/>
            </form>
        </div>
        
    );
};

export default LoginFormComponent;