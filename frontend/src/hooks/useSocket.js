import { useEffect, useState } from "react"
import { useUser } from "./useUser"

export const useSocket = () => {
    const [socket, setSocket] = useState(null)

    const WS_URL = "ws://localhost:3000"
    const {user, loading, error} = useUser()

    useEffect(() => {
        if(loading || error || !user) {
            return
        };

        const ws = new WebSocket(`${WS_URL}?token=${user.token}`);

        ws.onopen = () => {
            console.log("connected");
            setSocket(ws)
        }
        ws.onclose = () => {
            console.log("disconnected");
            setSocket(null)
        }

        return () => {
            ws.close();
        }
    }, [user, loading, error]);

    return socket;
}