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
        <div id='login-container' className='login-container'>
        <div id='hompage_avatar' className='Avatar'><Avatar /></div>
        <h1 id='homepage_title' className='title'>StyleSync</h1>
        <h2 id='homepage_header'>Home Page</h2>

         <div id='homepage_card-container' className='card-container'>
            {items.map((val, i) => (
             <div id='card' key={i} className='card'>
             <div className='card-content'>
                <h3 className='card-title'>{val.itemName}</h3>
                <p className='card-category'>{val.category}</p>
                <img
                    className='card-image'
                    src={val.item_picture}
                    alt={`Item ${i}`}
                />
            </div>
            <div className='card-buttons'>
                <button
                    value={val.id}
                    className='delete-button'
                    onClick={handleDelete}
                >
                Delete
                </button>
                <button
                    value={val.id}
                    className='update-button'
                    onClick={handleUpdate}
                >
                Update
                </button>
            </div>
          </div>
        ))}
      </div>

        <div>
            <br></br>
            <label id='update-name_label'>Update Name</label>
            <br></br>
            <input
                type='text'
                id='itemName'
                onChange={(e) => setNameUpdate(e.target.value)}
                value={nameUpdate}
            />
            <br></br>
            <label id='update-category_label'>Update Category</label>
            <br></br>
            <input
                type='text'
                id='category'
                onChange={(e) => setCategoryUpdate(e.target.value)}
                value={categoryUpdate}
            />
        </div>
        <div>
            <Link to='/additem'>
                <button id='additem_button' className='homelink'>Add Item</button>
            </Link>
        </div>
        </div>
    </>);
}