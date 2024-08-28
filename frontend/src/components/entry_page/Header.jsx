import React from 'react'
import {Link, NavLink, Outlet} from 'react-router-dom'

function Header() {
  return (
    <>
    <div className='min-h-screen bg-[url("/images/entrypage.jpg")] bg-cover'>
      <div className='w-52 pt-10 pl-10'>
        <Link to="/" className='flex justify-between items-center '>
          <img src="/images/logo.png" alt="logo" className='' />
          <img src="/images/name.png" alt="name" className='' />
        </Link>
      </div>

      <div className="w-1/2 relative left-1/4 bg-zinc-900 p-10 rounded-lg text-white mt-20">
        <div className="flex justify-between items-center p-5">
          <NavLink to="/user/login" className={({isActive}) => `w-full text-center mr-1 text-2xl rounded-full text-white p-5 ${isActive ? "bg-sky-700" : "bg-none"} hover:bg-sky-700`}>
            Login
          </NavLink>

          <NavLink to="/user/signup" className={({isActive}) => `w-full text-center ml-1 text-2xl rounded-full text-white p-5 ${isActive ? "bg-sky-700" : "bg-none"} hover:bg-sky-700`}>
            Sign Up
          </NavLink>
        </div>

        <Outlet />
      </div>
    </div>
    </>
  )
}

export default Header