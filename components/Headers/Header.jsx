import React, {useEffect} from "react";

//components
import GoogleAuth from "../Auth/GoogleAuth";
import UserProfile from "../Profile/UserProfile";
import GithubAuth from "../Auth/GithubAuth";

//helpers
import useWs from "../../hooks/useWs";
import useAuth from "../../hooks/useAuth";

import styles from "./styles.module.css"


const Header = () => {
    const {user, logout, getProfile} = useAuth();
    const { sendMessage, lastMessage, readyState, ReadyState } = useWs();


    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        if(lastMessage && lastMessage) {
            console.log(lastMessage.data)
        }
    }, [lastMessage])

    useEffect(() => {
        getProfile()

    }, [])

    const postMessage = () => {
        sendMessage(JSON.stringify({hello: "world"}))
    }

    const profileDropdownMenu = [
        {title: "Profile", fn: () => {}},
        {title: "Log out", fn: logout }
    ]

    return <div className={styles.wrapper}>
        <img src={"https://cdn-icons-png.flaticon.com/512/2991/2991148.png"}/>
        <button onClick={postMessage}>Send message</button>
        {user
            ? <UserProfile user={user} options={profileDropdownMenu}/>
            :<div className={styles.flexContainer}>
                <GoogleAuth/>
                <GithubAuth/>
        </div>}

    </div>
}

export default Header