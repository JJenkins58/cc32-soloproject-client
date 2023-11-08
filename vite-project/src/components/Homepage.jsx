import { Link } from 'react-router-dom';
import '../styles/Homepage.css';
import React, { useState, useEffect } from 'react';

export default function Homepage() {
    const [items, setItems] =useState([]);

    //get all items from closet
    async function serverCloset() {
        const fetchItems = await fetch("http://localhost:8080/items");
        const fetchItemsParsed = await fetchItems.json();
        setItems(fetchItemsParsed);
    }

    useEffect(() => {
        serverCloset();
    }, []);

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
                        <td>{val.id}</td>
                        <td>{val.userId}</td>
                        <td>{val.itemName}</td>
                        <td>{val.category}</td>
                        <td>{val.item_picture}</td>
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