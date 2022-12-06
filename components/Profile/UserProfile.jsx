import React, {useRef, useState} from "react";

import styles from "./styles.module.css"
import useClickOutside from "../../hooks/useClickOutside";

const UserProfile = ({user}) => {
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const ref = useRef();
    useClickOutside(ref, () => setDropdownOpened(false))

    const toggleDropdown = () => {
        setDropdownOpened(!dropdownOpened)
    }

    const getUserInitials = (name) => {
       return name.split(" ").map(str => str[0]).join("")
    }

    const initials = getUserInitials(user.name);

    return <div className={styles.wrapper} ref={ref}>
         <div className={styles.profileImg} onClick={toggleDropdown}>
        {initials}
        </div>
        {dropdownOpened && <div className={styles.dropdownWrapper}>
            <ul className={styles.dropdownList}>
                <li>
                    Profile
                </li>
                <li>
                    Log out
                </li>
            </ul>

        </div>}
    </div>
}
export default UserProfile