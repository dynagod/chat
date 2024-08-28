import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    axios.post('/api/v1/user/login', formData)
      .then((response) => {
        setTimeout(() => toast.success(response.data.message), 1000)
        console.log(`Login successfull: ${response.data}`)
        navigate('/chat')
      })
      .catch((error) => {
        if (error.response) {
          toast.error(`Error: ${error.response.data.message}`);
          console.error('Error during login:', error.response.data.message);
        } else if (error.request) {
          toast.error('Error: No response received from server');
          console.error('Error during login:', 'No response received from server');
        } else {
          toast.error(`Error: ${error.message}`);
          console.error('Error during login:', error.message);
        }
      })
  } 

  return (
    <div className='px-5 w-full'>
        <form onSubmit={handleSubmit} method='post'>
          <div className='mt-5'>
            <label htmlFor="email">
              <div>Email <span className='text-red-500'>*</span></div>
            </label>
            <input id='email' name='email' type="email" placeholder='Enter your email' className='outline-none text-xl rounded-lg bg-zinc-500 w-full p-2'/>
          </div>

          <div className='mt-5'>
            <label htmlFor="password">
              <div>Password <span className='text-red-500'>*</span></div>
            </label>
            <div className="relative">
              <span className='absolute right-0 text-xl p-2'>
                <button type='button' onClick={() => setShow(!show)}>
                  {show ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                </button>
              </span>
              <input id='password' name='password' type={show? "text" : "password"} placeholder='Enter your password' className='outline-none text-xl rounded-lg bg-zinc-500 w-full p-2'/>
            </div>
          </div>

          <div className='mt-5'>
            <input type="submit" value='Login' className='text-2xl rounded-full bg-blue-900 w-full p-2 cursor-pointer' />
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

export default Login