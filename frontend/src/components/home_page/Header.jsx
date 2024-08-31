import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showOption, setShowOption] = useState(false);
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    axios.get('/api/v1/user/verify-token')
    .then((response) => {
      setUserData(response.data.data);
      console.log(response.data.data);
      setUser(true);
    })
    .catch((error) => {})
  }, [])

  const handleLogout = (event) => {
    event.preventDefault();

    axios.post('/api/v1/user/logout')
    .then((response) => {
      console.log(`Logout successfull: ${response.data}`);
      setTimeout(() => toast.success(response.data.message), 1000)
      setRedirect(true)
    })
    .catch((error) => {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
        console.error('Error during logout:', error.response.data.message);
      } else if (error.request) {
        toast.error('Error: No response received from server');
        console.error('Error during logout:', 'No response received from server');
      } else {
        toast.error(`Error: ${error.message}`);
        console.error('Error during logout:', error.message);
      }
    })
  }

if (redirect) {
    return <Navigate to='/user/login' />
}

  return (
    <>
      <div className='flex pt-10 px-10 justify-between relative items-center text-2xl'>
        {showOption && (
        <div className={`absolute bg-zinc-900 shadow-lg rounded-lg p-2 right-0 top-10 text-zinc-3000 text-zinc-300 w-72 transition-transform duration-1000 ${showOption ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex justify-between items-center p-2 border-b-2 border-zinc-500'>
            <div className='flex justify-between items-center text-sm'>
              <div className='h-14 w-14 rounded-full mr-1 relative z-0 p-1 bg-black'>
                <img src={userData.profile} alt="" className='h-full w-full rounded-full'/>
                <div className='absolute bottom-1 right-1 bg-gray-400 h-4 w-4 rounded-full p-1'></div>
              </div>
              <div className='flex flex-col justify-center ml-1'>
                <p className=' text-base'>{userData.username}</p>
                <p className='text-zinc-400 text-base'>{userData.name}</p>
              </div>
            </div>
            <div>
              <button onClick={() => setShowOption(false)} className='hover:bg-zinc-600 px-2'>
              <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
          </div>
          <ul className="mt-1 p-2">
            <Link to='/profile'><li className="p-2 hover:bg-zinc-600 cursor-pointer rounded-lg flex items-end"><i className="fa-regular fa-user text-sm mb-1"></i>&nbsp;&nbsp;Profile</li></Link>
            <Link to=''><li className="p-2 hover:bg-zinc-600 cursor-pointer rounded-lg flex items-end"><i className="fa-solid fa-gear text-sm mb-1"></i>&nbsp;&nbsp;Settings</li></Link>
            <button className='w-full' onClick={handleLogout}><li className="p-2 hover:bg-zinc-600 cursor-pointer rounded-lg flex items-end"><i className="fa-solid fa-arrow-right-from-bracket text-sm mb-1"></i>&nbsp;&nbsp;Logout</li></button>
          </ul>
        </div>
        )}
        <Link to="/" className='flex justify-between items-center '>
          <img src="/images/logo.png" alt="logo" className='mr-1' />
          <img src="/images/name.png" alt="name" className='ml-1' />
        </Link>
        {user ? (
        <button type='button' onClick={() => setShowOption(true)}>
          <div className={`h-14 w-14 rounded-full mr-1 ${!showOption ? 'relative' : ''} p-1 bg-black`}>
            <img src={userData.profile} alt="" className='h-full w-full rounded-full'/>
            <div className={`${!showOption ? 'absolute' : ''} bottom-0 right-0 bg-black h-5 w-5 rounded-full p-1`}><div className='bg-yellow-600 h-full w-full rounded-full'></div></div>
          </div>
        </button> 
        ) : (
        <Link to="/user/login" className=''>
        <div className="p-2 hover:bg-sky-700 text-white rounded-lg">
            Login
        </div>
        </Link>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default Header