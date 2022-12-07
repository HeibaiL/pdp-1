import React from "react"
import {GoogleLogin, GoogleLogout} from "react-google-login";

import useAuth from "../../hooks/useAuth";


const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

const GoogleAuth = () => {
    const {onResponseGoogle} = useAuth()

    return  <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onResponseGoogle}
        // onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />
}
export default GoogleAuth