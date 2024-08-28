import axios from 'axios'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Chat = () => {
    const [redirect, setRedirect] = useState(false)

    const handleLogout = (event) => {
        event.preventDefault();

        axios.post('/api/v1/user/logout')
        .then((response) => {
            console.log(`Logout successfull: ${response.data}`);
            toast.success(response.data.message)
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
    <div className='min-h-screen bg-zinc-800'>
        <div className="">
            <p className='text-2xl text-white'>This is chat page</p>
            <button type='button' className='p-2 bg-red-500 text-white rounded-lg' onClick={handleLogout}>Logout</button>
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
    </div>
  )
}

export default Chat