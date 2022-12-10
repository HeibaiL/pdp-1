import axios from "axios";
import {TOKENS} from "../../hooks/useAuth";
import {updateRefreshToken} from "./auth";

const $axios = axios.create({
    // withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL,

});

$axios.interceptors.request.use(
    async config => {
        const accessToken = localStorage.getItem(TOKENS.ACCESS_TOKEN)
        if(accessToken){
            config.headers.authorization = "Bearer " + accessToken.split(" ")[1];
        }

        return config;
    },
    error => {
        Promise.reject(error)
    });

$axios.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refresh = localStorage.getItem(TOKENS.REFRESH_TOKEN)

        const {accessToken, refreshToken} = await updateRefreshToken(refresh.split(" ")[1]);
        localStorage.setItem(TOKENS.ACCESS_TOKEN, "Bearer " + accessToken)
        localStorage.setItem(TOKENS.REFRESH_TOKEN, "Bearer " + refreshToken)
        axios.defaults.headers.common['authorization'] = 'Bearer ' + accessToken;
        return $axios.request(originalRequest);
    }
    return Promise.reject(error);
});

export default $axios;