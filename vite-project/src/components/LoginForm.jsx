import React, { useEffect, useState } from 'react'
import '../styles/LoginForm.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { createContext } from 'react'

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
        
    }

    return (
        <>LoginForm</>
    );
};