import { useEffect, useState } from "react"
import axios from 'axios'
export const useUser = () => {

    const [data, setData] = useState(null)

    const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000'

    useEffect(() => {const fetchUser = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/auth/user`, {
            withCredentials: true // Include credentials (cookies, etc.) in the request
          });
          setData(response.data);
          console.log(response.data); 
        } catch (error) {
            console.error('There was an error while fetching user:', error);
            setData(undefined)
        }
    };
    
    fetchUser();
}, [BACKEND_URL]) 
return data
}