import React, { useEffect, useState } from 'react'
import '../styles/RegistrationForm.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoginForm from './LoginForm'

export default function RegistrationForm() {
    const [statusCode, setStatusCode] = useState(null);
    const [correctStatusCode, setCorrectStatusCode] = useState(false);

    useEffect(() => {
        if(statusCode === 201) {
            setCorrectStatusCode(true);
        }
    }, [statusCode]);

    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: ""
        }
    });

    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = async (data) => {
        const url = "https://soloproject-server.onrender.com/register";
        // const url = "http://localhost:8080/register";
        const returnedData = await axios.post(url, data).catch(error => {
            window.alert(error.response.data);
        });

        if(returnedData) {
            setStatusCode(returnedData.status);
            window.alert(returnedData.data);
        }
    }

    return (
        <>
        {!correctStatusCode ?
        <div id='registration-form_login-container' className='login-container'>
            <h1 id='registration-form_title' className='title'>StyleSync</h1>
            <h2 id='registration-form_loginheader' className='loginHeader'>Registration Form</h2>
            <form id='registration-form_form' className="registrationForm" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div id='registration-form_form-control' className='form-control'>
                    <label id='registration-form_label_username' htmlFor='username'>Username</label>
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
                    <p id='registration-form_error_username' className='error'>{errors.username?.message}</p>
                </div>

                <div id='registration-form_form-control_password' className='form-control'>
                    <label id='registration-form_password-label' htmlFor='password'>Password</label>
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
                    <p id='registration-form_error_password' className='error'>{errors.password?.message}</p>
                </div>

                <div id='registration-form_form-control_email' className='form-control'>
                    <label id='registration_form-email_label' htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        {...register("email", {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email format."
                            }
                        })}
                    />
                    <p id='registration-form_error_email' className='error'>{errors.email?.message}</p>
                </div>

                <div id='registration-form_form-control_firstname' className='form-control'>
                    <label htmlFor='firstName'>First Name</label>
                    <input 
                        type='text' 
                        id='firstName' 
                        {...register("firstName", {
                            required: {
                                value: true,
                                message: "First name is required."
                            }
                        })} 
                    />
                    <p id='registration-form_error_first-name' className='error'>{errors.first_name?.message}</p>
                </div>

                <div id='registration-form_form-control_lastname' className='form-control'>
                    <label id='registration-form_label_lastname' htmlFor='lastName'>Last Name</label>
                    <input 
                        type='text' 
                        id='lastName' 
                        {...register("lastName", {
                            required: {
                                value: true,
                                message: "Last name is required."
                            }
                        })} 
                    />
                    <p id='registration-form_form-control_error_message' className='error'>{errors.last_name?.message}</p>
                </div>

                <button id='registration-form_register_button' className='link' type='submit'>Register</button>
            </form>

            <Link to="/">
                <button id='back_button' className='link'>Back To Login</button>
            </Link>
        </div>:
        <LoginForm /> }
        </>
    );
};