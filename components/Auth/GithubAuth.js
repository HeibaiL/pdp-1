import React from "react";
import GitHubLogin from 'react-github-login';
import useAuth from "../../hooks/useAuth";

const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID

const GithubAuth = () => {
    const {login, onResponseGithub} = useAuth()
    return  <GitHubLogin clientId={clientId}
                         redirectUri=""
                         onSuccess={onResponseGithub}
                          onFailure={(ex) => console.log(ex)}/>
}
export default GithubAuth