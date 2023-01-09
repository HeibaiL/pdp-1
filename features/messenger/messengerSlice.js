import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    {
        id: 1,
        postId:1,
        chatRoomId: 1,
        message: 'message',
        postedByUser: 'Kalinichenko Andrii',
        recipient: 'Vlad',
        createdAt: '11.11.11'

    },
    {
        id: 2,
        postId:2,
        chatRoomId: 1,
        message: 'message',
        postedByUser: 'Kalinichenko Andrii',
        recipient: 'Vlad',
        createdAt: '11.11.11'

    },
    {
        id: 3,
        postId:3,
        chatRoomId: 1,
        message: 'message',
        postedByUser: 'Vlad',
        recipient: 'Kalinichenko Andrii',
        createdAt: '11.11.11'

    },
    {
        id: 4,
        postId:4,
        chatRoomId: 1,
        message: 'message',
        postedByUser: 'Vlad',
        recipient: 'Kalinichenko Andrii',
        createdAt: '11.11.11'
    },
]


export const messengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {}
})


export const getMessengerData = state => state.messenger;

export default messengerSlice.reducer