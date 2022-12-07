import {useUserContext} from "../context/User";
import {getMe, githubLogin, googleAuth} from "../pages/api/auth";

const TOKENS = {
    ACCESS_TOKEN: "pdp_access-token",
    REFRESH_TOKEN: "pdp_refresh-token"
}

const useAuth = () => {
    const {user, setUser} = useUserContext();

    const _saveTokens = (access, refresh) => {
        localStorage.setItem(TOKENS.ACCESS_TOKEN, "Bearer " + access)
        localStorage.setItem(TOKENS.REFRESH_TOKEN, "Bearer " + refresh)
    }

    const getProfile = async () => {
        const refresh = localStorage.getItem(TOKENS.REFRESH_TOKEN);
        if(refresh) {
           const user = await getMe(refresh);
            if(user){
                setUser(user)
            }
        }
        return null
    }

    const onResponseGoogle = async (googleData) => {
        try{
            const data = await googleAuth(googleData.tokenId)
            if(data){
                login(data)
            }
        }catch(ex){
            //TOOO: toastify error
        }
    }
    const onResponseGithub = async (githubData) => {
        const data = await githubLogin(githubData.code);
        if(data){
            login(data)
        }
    }

    const login = (data) => {
        setUser(data.user)
        _saveTokens(data.accessToken, data.refreshToken)

    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem(TOKENS.ACCESS_TOKEN)
        localStorage.removeItem(TOKENS.REFRESH_TOKEN)
    }

    return {login, logout, user, onResponseGoogle, getProfile, onResponseGithub}
}
export default useAuth