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
        <div id='additem_login-container' className='login-container'>
            <Avatar />
            <h1 id='additem_header' className='additem-header'>AddItem</h1>
            <form id='additem_additemForm' className='additemForm' onSubmit={handleSubmit(onSubmit)} noValidate>
                
                <div id='additem_form-control' className='form-control'>
                    <label id='itemName_label' htmlFor='itemName'>Item Name</label>
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
                    <p id='additem_error_message_itemName' className='error'>{errors.itemName?.message}</p>
                </div>

                <div id='additem_form-control' className='form-control'>
                    <label id='additem_category_label' htmlFor='category'>Category</label>
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
                    <p id='additem_error_message_category' className='error'>{errors.category?.message}</p>
                </div>

                <button id='button_addItem' className='link' type='submit'>Add Item</button>
            </form>

            <Link to='/home'>
                <button id='button_home' className='additem-home-button'>Home</button>
            </Link>
        </div>
    );
}