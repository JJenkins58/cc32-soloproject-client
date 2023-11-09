import { Link } from 'react-router-dom';
import '../styles/Homepage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from './Avatar';

export default function Homepage() {
    const [items, setItems] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [nameUpdate, setNameUpdate] = useState("");
    const [categoryUpdate, setCategoryUpdate] = useState("");

    //get all items from closet
    async function serverCloset() {
        // const fetchItems = await fetch("http://localhost:8080/items");
        const fetchItems = await fetch("https://soloproject-server.onrender.com/items/");
        const fetchItemsParsed = await fetchItems.json();
        setItems(fetchItemsParsed);
    }

    useEffect(() => {
        serverCloset();
    }, []);

    useEffect(() => {
        if(deleted) {
            serverCloset();
            setDeleted(false);
        }
    }, [deleted]);

    useEffect(() => {
        if(updated) {
            serverCloset();
            setUpdated(false);
        }
    }, [updated]);

    const handleDelete = async (e) => {
         const url = "https://soloproject-server.onrender.com/items/";
        // const url = "http://localhost:8080/items/";
        const itemID = e.target.value;
        
        await axios.delete(url + itemID);
        setDeleted(true);
    }

    const handleUpdate = async (e) => {
          const url = "https://soloproject-server.onrender.com/items/";
        //  const url = "http://localhost:8080/items/";
         const itemID = e.target.value;
         const data = {
            id: itemID,
            itemName: nameUpdate,
            category: categoryUpdate,
        }
         const returnedData = await axios.put(url + itemID, data).catch(error => {
            window.alert(error.response.data);
         });
         setUpdated(true);

         if(returnedData) {
            setStatusCode(returnedData.status);
            window.alert(returnedData.data);
         }
    }

    return (<>
        <Avatar />
        <h1>Home Page</h1>
        <table>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((val,i) =>
                    <tr>
                        <td id='row-userId'>{val.userId}</td>
                        <td id='row-itemName'>{val.itemName}</td>
                        <td id='row-category'>{val.category}</td>
                        <td id='row-item-picture'>{val.item_picture}</td>
                        <td><button value={val.id} className='delete-button' onClick={handleDelete}>Delete</button></td>
                        <td><button value={val.id} className='update-button' onClick={handleUpdate}>Update</button></td>
                    </tr>)
                }
            </tbody>
        </table>
        <div>
            <input
                type='text'
                id='itemName'
                onChange={(e) => setNameUpdate(e.target.value)}
                value={nameUpdate}
            />
            <input
                type='text'
                id='category'
                onChange={(e) => setCategoryUpdate(e.target.value)}
                value={categoryUpdate}
            />
        </div>
        <div>
            <Link to='/additem'>
                <button className='homelink'>Add Item</button>
            </Link>
        </div>
    </>);
}