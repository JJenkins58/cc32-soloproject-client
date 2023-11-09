import { Link } from 'react-router-dom';
import '../styles/Homepage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Homepage() {
    const [items, setItems] = useState([]);
    const [deleted, setDeleted] = useState(false);

    //get all items from closet
    async function serverCloset() {
        const fetchItems = await fetch("http://localhost:8080/items");
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
    }, [deleted])

    const handleDelete = async (e) => {
         const url = "https://soloproject-server.onrender.com/items/";
        // const url = "http://localhost:8080/items/";
        const itemID = e.target.value;
        console.log("itemID:",itemID);
        await axios.delete(url + itemID);
        setDeleted(true);
    }

    return (<>
        <h1>Home Page</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
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
                        <td id='row-id'>{val.id}</td>
                        <td id='row-userId'>{val.userId}</td>
                        <td id='row-itemName'>{val.itemName}</td>
                        <td id='row-category'>{val.category}</td>
                        <td id='row-item-picture'>{val.item_picture}</td>
                        <td><button value={val.id} className='delete-button' onClick={handleDelete}>Delete Item</button></td>
                        <td><button className='edit-button'>Edit Item</button></td>
                    </tr>)
                }
            </tbody>
        </table>
        <div>
            <Link to='/additem'>
                <button className='homelink'>Add Item</button>
            </Link>
        </div>
    </>);
}