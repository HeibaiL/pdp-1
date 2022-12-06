import React from "react";

import useAuth from "../../hooks/useAuth";

import GoogleAuth from "../Auth/GoogleAuth";
import UserProfile from "../Profile/UserProfile";

import styles from "./styles.module.css"

const Header = () => {
    const {user} = useAuth();


    return <div className={styles.wrapper}>
        <img src={"https://cdn-icons-png.flaticon.com/512/2991/2991148.png"}/>
        {user
            ? <UserProfile user={user}/>
            :<div className={styles.flexContainer}>
            <GoogleAuth/>
        </div>}
    </div>
}
export default Header