import React, { useContext} from "react";
import { username } from "./LoginForm";
import "../styles/Avatar.css";

export default function Avatar() {
    const userUsername = useContext(username);

    return (
        <>
        <h1 className="avatar">{userUsername}'s Closet</h1>
        </>
    )
}