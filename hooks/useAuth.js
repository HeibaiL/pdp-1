import {useUserContext} from "../context/User";

const useAuth = () => {
    const {user, setUser} = useUserContext();

    const login = (user) => {
        setUser(user)
    }
    const logout = () => {
        setUser(null)
    }

    return {login, logout, user}
}
export default useAuth