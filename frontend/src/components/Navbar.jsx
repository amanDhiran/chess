import React, { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const {user, loading, error, setUser} = useUser()
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000'
  const navigate = useNavigate();

    const handleLogOut = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/auth/logout`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(null)
          navigate("/");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
  // useEffect(() => {
  //   if (loading) {
  //     // Still loading
  //     return;
  //   }

  //   if (!user || error) {
  //     navigate('/login');
  //   } else {
  //     console.log("user from games:", user);
  //   }
  // }, [loading]);

  return (
    
    <div className='flex justify-between px-5 pt-8 items-center'>
      <div className='text-white font-semibold text-2xl'>
        Play Chess
      </div>
      <div>
        {!user ?
        <div>
          <button className='bg-green-400 px-3 py-2 rounded-lg'>Log In</button>
        </div> : 
        <div className='flex items-center gap-4'>
          <div className='text-white'>{user.name} </div> 
          <button onClick={handleLogOut} className='bg-green-400 px-3 py-2 rounded-lg'>Log Out</button>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar