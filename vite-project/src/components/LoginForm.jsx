import React, { useEffect, useState } from 'react';
import '../styles/LoginForm.css';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createContext } from 'react';
import Homepage from './Homepage';

export let userInfo = createContext();
export let username = createContext();

export default function LoginForm() {
    const [userId, setUserId] = useState(null);
    const [statusCode, setStatusCode] = useState(null);
    const [correctStatusCode, setCorrectStatusCode] = useState(false);
    const [userUsername, setUserUsername] = useState(null);

    userInfo = createContext(userId);
    username = createContext(userUsername);

    useEffect(() => {
        if(statusCode === 200) {
            setCorrectStatusCode(true);
        }
    }, [statusCode]);

    const form = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = async (data) => {
        // const url = "http://localhost:8080/login";
        const url = "https://soloproject-server.onrender.com/login";
        const returnedData = await axios.post(url, data).catch(error => {
            window.alert(error.response.data)
        });
        
        if(returnedData) {
            setStatusCode(returnedData.status);
            setUserId(returnedData.data.accountID);
            setUserUsername(returnedData.data.username);
        }
    }

    return (
        <>
        {!correctStatusCode ?
        <div id='loginform_login-container' className='login-container'>
            <h1 id='login_title' className='title'>StyleSync</h1>
            <h2 id='login_login-header' className='loginHeader'>Login Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div id='login_form-control_username' className='form-control'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        id='username'
                        {...register("username", {
                            required: {
                                value: true,
                                message:"Username is required."
                            }
                        })}
                    />
                    <p id='login_form-error_message' className='error'>{errors.username?.message}</p>
                </div>

                <div id='login_form-control_password' className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required."
                            }
                        })}
                    />
                    <p className='error'>{errors.password?.message}</p>
                </div>
                <button id='login_form-button_login' className='link' type='submit'>Log In</button>
            </form>
            <Link to="/registration">
                <button id='login_form-button_registration' className='link'>Register</button>
            </Link>
        </div>:
        <Homepage userId={userId}/> }
        </>
    );
};