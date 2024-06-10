import { useEffect, useState } from "react"

export const useSocket = () => {
    const [socket, setSocket] = useState(null)

    const WS_URL = "ws://localhost:3000"

    useEffect(() => {
        const ws = new WebSocket(WS_URL);

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
    }, []);

    return socket;
}