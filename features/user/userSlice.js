import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

let initialState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.userData = action.payload
        },
        setAccessToken: (state,action) => {
            state.accessToken = action.payload
        },
        setRefreshToken: (state,action) => {
            state.refreshToken = action.payload
        },
    }
})


export const {setAccessToken, setRefreshToken, setUser} = userSlice.actions;

export const getUser = state => state.user.userData;

export default userSlice.reducer