import React from "react"
import {GoogleLogin, GoogleLogout} from "react-google-login";

import useAuth from "../../hooks/useAuth";


const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

const GoogleAuth = () => {
    const {login} = useAuth()

    const responseGoogle =  async (googleData) => {
        const res = await fetch("http://localhost:3004/api/google-auth", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
       const user = await res.json();
        if(user){
            login(user)
        }
    }

    return  <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={responseGoogle}
        // onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />
}
export default GoogleAuth