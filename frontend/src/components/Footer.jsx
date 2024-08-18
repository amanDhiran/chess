import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillGithub } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className='mt-14 flex justify-end border-t-[1px] py-4 px-7 md:px-16 lg:px-32 border-white/5'>
        <div className='flex justify-center items-center gap-3  text-gray-400/30'>
          <p className='text-xs'>© 2024 All Rights Reserved</p>
          <a href="https://github.com/amanDhiran/chess.git" className='text-2xl md:text-3xl hover:text-white/40 ml-3' target='_blank'><AiFillGithub/></a>
          <a href="https://x.com/amxnDhiran" className='text-2xl md:text-3xl hover:text-white/40' target='_blank'><FaXTwitter/></a>
        </div>
    </div>
  )
}

export default Footer