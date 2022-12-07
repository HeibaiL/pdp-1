// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const getMe = async (token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/me`, {headers: {authorization: token}})
  return res.json()
}

export const googleAuth = async (token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/google-auth`, {
    method: "POST",
    body: JSON.stringify({
      token
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  return res.json()
}

export async function githubLogin(code) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/github-auth`,{
      method: "POST",
      body: JSON.stringify({code}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    /**
     * GitHub returns data as a string we must parse.
     */
    return res.json()
  }catch(ex){
    console.log(ex)
  }
};