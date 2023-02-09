import React from 'react';
import { useForm } from 'react-hook-form'
import '../styles/RegisterForm.scss'
const RegisterFormComponent = () => {
    const {register, handleSubmit} = useForm();

    return (
        <div className='registerForm'>
            <form onSubmit = {handleSubmit((data) => console.log(data))} className="form">
                <div className='form_register'>Register</div>
                <div className='form_box'>
                    <label className='form_box-label'>Username</label>
                    <input {...register("username")}/>
                </div>
                <div className='form_box'>
                    <label className='form_box-label'>password</label>
                    <input {...register("password")}/>
                </div>
                <div className='form_box'>
                    <label className='form_box-label'>Reapeat password</label>
                    <input {...register("Reapeat password")}/>
                </div>
                <div className='form_box'>
                    <label className='form_box-label'>email</label>
                    <input {...register("email")}/>
                </div>
                <input type="submit"/>


            </form>
            
        </div>
    );
};

export default RegisterFormComponent;