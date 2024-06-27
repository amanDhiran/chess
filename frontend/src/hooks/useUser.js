import { useEffect, useState } from "react"
import axios from 'axios'
export const useUser = () => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState(null); // State to track errors

    const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000'

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/auth/user`, {
            withCredentials: true // Include credentials (cookies, etc.) in the request
          });
          setUser(response.data);
          setLoading(false)
        } catch (error) {
            console.error('There was an error while fetching user:', error);
            setError(error)
            setLoading(false)
        }
    };
    
    fetchUser();
}, [BACKEND_URL]) 

return {user, loading, error, setUser}
}