import {useUserContext} from "../context/User";
import {getMe, githubLogin, googleAuth, logout, logoutUser, updateRefreshToken} from "../pages/api/auth";

export const TOKENS = {
    ACCESS_TOKEN: "pdp_access-token",
    REFRESH_TOKEN: "pdp_refresh-token"
}

const useAuth = () => {
    const {user, setUser} = useUserContext();

    const _saveTokens = (access, refresh) => {
        localStorage.setItem(TOKENS.ACCESS_TOKEN, "Bearer " + access)
        localStorage.setItem(TOKENS.REFRESH_TOKEN, "Bearer " + refresh)
    }

    const getTokens = () => {
        if (typeof window !== 'undefined') {
            const lsAccessToken = localStorage.getItem(TOKENS.ACCESS_TOKEN);
            const lsRefreshToken = localStorage.getItem(TOKENS.REFRESH_TOKEN);
            return {
                accessToken: lsAccessToken? lsAccessToken : null,
                refreshToken: lsRefreshToken? lsRefreshToken : null
            }
        }
    }

    const getProfile = async () => {
        const {refreshToken, accessToken} = getTokens()
        if(accessToken || refreshToken) {
           const data = await getMe(accessToken);
           setUser(data)


        }

        return null
    }

    const onResponseGoogle = async (googleData) => {
        try{
            const data = await googleAuth(googleData.tokenId);
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

    const logout = async () => {
        const {refreshToken} = getTokens();
        await logoutUser(refreshToken.split(" ")[1])

        setUser(null)
        localStorage.removeItem(TOKENS.ACCESS_TOKEN)
        localStorage.removeItem(TOKENS.REFRESH_TOKEN)
    }

    return {login, logout, user, onResponseGoogle, getProfile, onResponseGithub, getTokens}
}
export default useAuth