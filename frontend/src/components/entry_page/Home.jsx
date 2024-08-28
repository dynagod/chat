import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div className='min-h-screen bg-[url("/images/entrypage.jpg")] bg-cover'>
      <div className='flex pt-10 px-10 justify-between items-center text-2xl'>
        <div className=''>
          <Link to="/" className='flex justify-between items-center '>
            <img src="/images/logo.png" alt="logo" className='' />
            <img src="/images/name.png" alt="name" className='' />
          </Link>
        </div>
        <Link to="/user/login" className=''>
        <div className="p-2 hover:bg-sky-700 text-white rounded-lg">
            Login
        </div>
        </Link>
      </div>
      <div className="w-full text-white">
        Chat with your friend !!
      </div>
    </div>
    </>
  )
}

export default Home