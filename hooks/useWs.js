import useWebSocket, { ReadyState } from 'react-use-websocket';

import useAuth from "./useAuth";

const useWs = () => {
    const { getTokens} = useAuth();

    const tokens = getTokens();
    const webSocketUrl = process.env.NEXT_PUBLIC_API_WS + `?userToken=${tokens?.accessToken}`

    const { sendMessage, lastMessage, readyState } = useWebSocket(webSocketUrl)
    return { sendMessage, lastMessage, readyState, ReadyState }
}


export default useWs