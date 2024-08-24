import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [show, setShow] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    axios.post('/api/v1/user/signup', formData)
      .then((response) => {
        toast.success(response.data.message);
        console.log('Signup successful:', response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(`Error: ${error.response.data.message}`);
          console.error('Error during signup:', error.response.data.message);
        } else if (error.request) {
          toast.error('Error: No response received from server');
          console.error('Error during signup:', 'No response received from server');
        } else {
          toast.error(`Error: ${error.message}`);
          console.error('Error during signup:', error.message);
        }
      });
  };

  return (
    <div className='px-5 w-full'>
        <form onSubmit={handleSubmit} encType='multipart/form-data' method='post'>
        <div className='mt-5'>
            <label htmlFor="username">
              <div>User Name <span className='text-red-500'>*</span></div>
            </label>
            <input id='username' name='username' type="text" placeholder='Enter your user name' className='outline-none text-xl rounded-lg bg-zinc-500 w-full p-2' />
          </div>

          <div className='mt-5'>
            <label htmlFor="name">
              <div>Name <span className='text-red-500'>*</span></div>
            </label>
            <input id='name' name='name' type="text" placeholder='Enter your name' className='outline-none text-xl rounded-lg bg-zinc-500 w-full p-2' />
          </div>

          <div className='mt-5'>
            <label htmlFor="email">
              <div>Email <span className='text-red-500'>*</span></div>
            </label>
            <input id='email' name='email' type="email" placeholder='Enter your email' className='outline-none text-xl rounded-lg bg-zinc-500 w-full p-2' />
          </div>

          <div className='mt-5'>
            <label htmlFor="password">
              <div>Password (must be greater than 5) <span className='text-red-500'>*</span></div>
            </label>
            <div className="relative">
              <span className='absolute right-0 text-xl p-2'>
                <button type='button' onClick={() => setShow(!show)}>
                  {show ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                </button>
              </span>
              <input id='password' name='password' type={show? "text" : "password"} placeholder='Enter your password' className='outline-none text-xl rounded-lg bg-zinc-500 w-full p-2' />
            </div>
          </div>

          <div className='mt-5'>
            <label htmlFor="confirm">
              <div>Confirm Password <span className='text-red-500'>*</span></div>
            </label>
            <div className="relative">
              <span className='absolute right-0 text-xl p-2'>
                <button type='button' onClick={() => setShow(!show)}>
                  {show ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                </button>
              </span>
              <input id='confirm' name='confirm' type={show? "text" : "password"} placeholder='Confirm password' className='outline-none text-xl rounded-lg bg-zinc-500 w-full p-2' />
            </div>
          </div>

          <div className="mt-8 text-center">
            <label className='file text-xl rounded-lg bg-zinc-500 w-full py-2 px-8 cursor-pointer' htmlFor="profile">
            <i className="fa-solid fa-file-image"></i> &nbsp;
              Choose your profile picture
            </label>
            <input type="file" id='profile' name='profile' accept='image' className='hidden' />
          </div>

          <div className='mt-5'>
            <input type="submit" value='Sign Up' className='text-2xl rounded-full bg-blue-900 w-full p-2 cursor-pointer' />
          </div>
        </form>

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

export default Signup