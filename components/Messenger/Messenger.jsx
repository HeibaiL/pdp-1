import styles from "./styles.module.css"
import {useSelector} from "react-redux";
import {getMessengerData} from "../../features/messenger/messengerSlice";
import {getUser} from "../../features/user/userSlice";
import {useState} from "react";



const Messenger = () => {
    const [input, setInput] = useState('')
    const chatData = useSelector(getMessengerData);
    const userData = useSelector(getUser)
    console.log(chatData, userData)
    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const recipientName = userData?.name === chatData[0].postedByUser ?
         chatData[0].recipient
       : chatData[0].postedByUser

    console.log(recipientName)
    return <div className={styles.messenger}>
        <div className={styles.container}>
            <div className={styles.messenger_header}>
                <img className={styles.messenger_userPhoto} src={"https://cdn-icons-png.flaticon.com/512/2991/2991148.png"} alt="User"/>
                <p className={styles.messenger_userName}>{recipientName}</p>
            </div>
            <div className={styles.messenger_body}>
                {chatData.map(item =>
                    <>
                        {item.recipient === recipientName ?
                            <div className={`${styles.recipient_message} ${styles.message}`}>{item.message}</div>
                            : <div className={`${styles.sender_message} ${styles.message}`}>{item.message}</div>
                        }
                    </>
                )}
            </div>
            <form className={styles.messenger_form}>
                <input
                    value={input}
                    onChange={handleChange}
                    className={styles.form_input}
                    type="text"
                />
                <button className={styles.form_button}><img src={"https://cdn-icons-png.flaticon.com/512/4698/4698102.png"} alt="sent"/></button>
            </form>
        </div>
    </div>
}

export default Messenger;