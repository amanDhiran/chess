import { useEffect, useState } from "react"
import { useUser } from "./useUser"

export const useSocket = () => {
    const [socket, setSocket] = useState(null)

    const WS_URL = "ws://localhost:3000"
    const data = useUser()

    useEffect(() => {
        if(!data) {
            console.log(data)
            return
        };

        const ws = new WebSocket(`${WS_URL}?token=${data.token}`);

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
    }, [data]);

    return socket;
}