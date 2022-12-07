import React, {useEffect} from "react";

import useAuth from "../../hooks/useAuth";

import GoogleAuth from "../Auth/GoogleAuth";
import UserProfile from "../Profile/UserProfile";

import styles from "./styles.module.css"
import GithubAuth from "../Auth/GithubAuth";

const Header = () => {
    const {user, logout, getProfile} = useAuth();

    useEffect(() => {
        getProfile()
    }, [])
    const profileDropdownMenu = [
        {title: "Profile", fn: () => {}},
        {title: "Log out", fn: logout }
    ]
        console.log(user)

    return <div className={styles.wrapper}>
        <img src={"https://cdn-icons-png.flaticon.com/512/2991/2991148.png"}/>
        {user
            ? <UserProfile user={user} options={profileDropdownMenu}/>
            :<div className={styles.flexContainer}>
                <GoogleAuth/>
                <GithubAuth/>
        </div>}
    </div>
}
export default Header