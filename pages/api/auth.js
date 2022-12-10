// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import $axios from "./index";

export const getMe = async () => {
  try{
    let res =  await $axios.get("/profile/me")
    return res.data
  }catch(ex){
    console.log(ex)
  }
}

export const googleAuth = async (token) => {
  const res = await $axios.post(`/google-auth`, {token})
  return res.data
}

export async function githubLogin(code) {
  try {
    const res = await $axios.post(`/github-auth`,{ code })
    /**
     * GitHub returns data as a string we must parse.
     */
    return res.data
  }catch(ex){
    console.log(ex)
  }
}
export const logoutUser = async (refreshToken) => {
  await $axios.post("/logout", {refreshToken})
}

export const updateRefreshToken = async (refreshToken) => {
  const res = await $axios.post(`/refresh`, {refreshToken})
  return res.data

}