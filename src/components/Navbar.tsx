import React from 'react'
import logo from "/logo.svg"
import { useNavigate, useLocation } from 'react-router'

const Navbar:React.FC = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()

  return (
    <nav className=' flex justify-between items-center bg-darkerGray text-white px-6 py-4'>
      <div className='flex gap-6'>
        <img className='w-9 cursor-pointer' src={logo} alt="Logo" onClick={() => {navigate("/home")}}/>
        <input className='rounded-lg bg-darkGray w-[600px] pl-3 outline-none font-normal' type="text" placeholder='Search Bar' />
      </div>

      <div className='flex gap-14'>
        <div className={`font-semibold cursor-pointer hover:text-accentBlue ${pathname==="/home" ? "text-accentBlue" : ""}`} onClick={() => navigate("/home")}>HOME</div>
        <div className={`font-semibold cursor-pointer hover:text-accentBlue ${pathname==="/discover-movies" ? "text-accentBlue" : ""}`} onClick={() => navigate("/discover-movies")}>MOVIES</div>
        <div className={`font-semibold cursor-pointer hover:text-accentBlue ${pathname==="/discover-tv" ? "text-accentBlue" : ""}`} onClick={() => navigate("/discover-tv")}>TV SERIES</div>
        <div className={`font-semibold cursor-pointer hover:text-accentBlue ${pathname==="/top-rated" ? "text-accentBlue" : ""}`} onClick={() => navigate("/top-rated")}>TOP RATED</div>
      </div>
    </nav>
  )
}

export default Navbar