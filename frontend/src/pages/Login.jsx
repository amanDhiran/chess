import React from 'react'
import { FcGoogle } from "react-icons/fc";


const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000'

function Login() {
    
    const google = () => {
        window.open(`${BACKEND_URL}/auth/google`, '_self');
    };
    
  return (
    <div className=" min-h-screen relative bg-[#302E2B] p-4 before:bottom-0 before:right-0 before:left-0 before:h-full before:w-full  before:fixed before:bg-contain before:bg-repeat-x before:bg-bottom before:bg-[url('/chessboard-background.png')]">
      <div className='flex flex-col items-center justify-center min-h-screen '>
        <div className="text-5xl z-10 font-bold text-white mb-8">Play Chess</div>
        <button
          onClick={google}
          className="bg-white flex items-center gap-12 z-10 hover:bg-[#F1F1F1] font-medium py-2 px-4 rounded lg:px-7 lg:py-3 "
        >
          <FcGoogle className='text-3xl'/>Log in with Google
        </button>
      </div>
    </div>
  )
}

export default Login