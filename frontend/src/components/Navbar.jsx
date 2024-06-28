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

  return (
    <div className='flex justify-between px-5 lg:px-16 py-5 items-center'>
      <div className='text-white font-semibold text-2xl'>
        Play Chess
      </div>
      <div>
        {!user ?
        <div className='flex gap-2'>
          {/* <button className='bg-[#373735] hover:bg-[#4C4B48] text-white/70 hover:text-white px-2 text-sm font-medium md:text-base rounded-[3px] md:px-3 py-1 md:py-2 md:rounded-lg'>Sign Up</button> */}
          <button onClick={() => {navigate('/login')}} className='bg-[#81b64c] hover:bg-[#a4e069] text-white px-2 text-sm font-medium md:text-base rounded-[3px] md:px-3 py-1 md:py-2 md:rounded-lg'>Log In</button>
        </div> : 
        <div className='flex items-center gap-4'>
          <div className='text-white'>{user.name} </div> 
          <button onClick={handleLogOut} className='bg-[#81b64c] hover:bg-[#a4e069] text-white px-2 text-sm font-medium md:text-base rounded-[3px] md:px-3 py-1 md:py-2 md:rounded-lg'>Log Out</button>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar