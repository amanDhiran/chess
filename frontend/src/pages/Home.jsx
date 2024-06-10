import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-screen pt-10'>
        <div className='flex justify-center gap-5'>
          <div className='md:max-w-96 rounded-md overflow-hidden hidden md:block'>
            <img src="https://www.chess.com/bundles/web/images/offline-play/standardboard.1d6f9426.png" alt="" />
          </div>
          <div className='flex flex-col justify-center gap-8'>
            <h3 className='text-white text-center text-4xl font-bold'>Welcome to the world of Chess!</h3>
            <div className='flex justify-center'>
              <button className='px-20 rounded-md py-5 text-white font-semibold text-2xl bg-[#81b64c] hover:bg-[#a4e069]' onClick={() => {navigate('/game')}}>
                Play Online
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Home