import React from 'react';
import '../styles/loginForm.scss'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
const LoginFormComponent = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data)
        navigate("/")
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
                    <input {...register('password')}/>
                </div>
                
                <input type='submit'/>
            </form>
        </div>
        
    );
};

export default LoginFormComponent;