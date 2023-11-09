import { Link } from 'react-router-dom';
import '../styles/AddItem.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { userInfo } from './LoginForm';
import Avatar from './Avatar';

export default function AddItem() {
    const [statusCode, setStatusCode] = useState(null);
    const [correctStatusCode, setCorrectStatusCode] = useState(false);
    const userId = useContext(userInfo);
    const numUserId = Number(userId);

    useEffect(() => {
        if(statusCode === 202) {
            setCorrectStatusCode(true);
        }
    }, [statusCode])

    const form = useForm({
        defaultValues: {
            userId: numUserId,
            itemName: "",
            category: "",
            picture: null
        }
    });

    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = async (data) => {
         const url = "https://soloproject-server.onrender.com/additems";
        //  const url = "http://localhost:8080/additems";
         const returnedData = await axios.post(url, data).catch(error => {
            window.alert(error.response.data);
         });

         if(returnedData) {
            setStatusCode(returnedData.status);
            window.alert(returnedData.data);
         }
    }

    return (
        <div className='login-container'>
            <Avatar />
            <h1 className='additem-header'>AddItem</h1>
            <form className='additemForm' onSubmit={handleSubmit(onSubmit)} noValidate>
                
                <div className='form-control'>
                    <label htmlFor='itemName'>Item Name</label>
                    <input
                        type='text'
                        id='itemName'
                        {...register("itemName", {
                            required: {
                                value: true,
                                message: "Item name is required."
                            }
                        })}
                    />
                    <p className='error'>{errors.itemName?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor='category'>Category</label>
                    <input
                        type='text'
                        id='category'
                        {...register("category", {
                            required: {
                                value: true,
                                message: "Category is required."
                            }
                        })}
                    />
                    <p className='error'>{errors.category?.message}</p>
                </div>

                <button className='link' type='submit'>Add Item</button>
            </form>

            <Link to='/home'>
                <button className='additem-home-button'>Home</button>
            </Link>
        </div>
    );
}