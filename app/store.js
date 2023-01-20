import {configureStore} from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice"
import messengerSlice from "../features/messenger/messengerSlice"

export const store = configureStore({
    reducer:{
        user: userSlice,
        messenger: messengerSlice,
    }
})