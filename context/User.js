import {createContext, useContext, useState} from "react";

export const UserContext = createContext({
    user: null,
    // eslint-disable-next-line no-empty-function
    setUser: () => {},

});

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw Error("useUserContext should br used within a CurrencyProvider");
    }

    return context;
}
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}
export default UserProvider;
