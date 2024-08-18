import React, { useState } from 'react'

function Signup() {
  const [show, setShow] = useState(false)

  return (
    <div className='px-5 w-full'>
        <form action="">
          <div className='mt-5'>
            <label htmlFor="name">
              <div>Name <span className='text-red-500'>*</span></div>
            </label>
            <input id='name' name='name' type="text" placeholder='Enter your name' className='outline-none text-xl rounded-lg bg-zinc-500 w-full p-2' required />
          </div>

          <div className='mt-5'>
            <label htmlFor="email">
              <div>Email <span className='text-red-500'>*</span></div>
            </label>
            <input id='email' name='email' type="email" placeholder='Enter your email' className='outline-none text-xl rounded-lg bg-zinc-500 w-full p-2' required />
          </div>

          <div className='mt-5'>
            <label htmlFor="password">
              <div>Password <span className='text-red-500'>*</span></div>
            </label>
            <div className="relative">
              <span className='absolute right-0 text-xl p-2'>
                <button onClick={() => setShow(!show)}>
                  {show ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                </button>
              </span>
              <input id='password' name='password' type={show? "text" : "password"} placeholder='Enter your password' className='outline-none text-xl rounded-lg bg-zinc-500 w-full p-2' required />
            </div>
          </div>

          <div className='mt-5'>
            <label htmlFor="confirm">
              <div>Confirm Password <span className='text-red-500'>*</span></div>
            </label>
            <div className="relative">
              <span className='absolute right-0 text-xl p-2'>
                <button onClick={() => setShow(!show)}>
                  {show ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                </button>
              </span>
              <input id='confirm' name='confirm' type={show? "text" : "password"} placeholder='Confirm password' className='outline-none text-xl rounded-lg bg-zinc-500 w-full p-2' required />
            </div>
          </div>

          <div className="mt-8 text-center">
            <label className='file text-xl rounded-lg bg-zinc-500 w-full py-2 px-8 cursor-pointer' htmlFor="file">
            <i className="fa-solid fa-file-image"></i> &nbsp;
              Choose your profile picture
            </label>
            <input type="file" id='file' name='file' accept='image' className='hidden' />
          </div>

          <div className='mt-5'>
            <input type="submit" value='Sign Up' className='text-2xl rounded-full bg-blue-900 w-full p-2 cursor-pointer' />
          </div>
        </form>
    </div>
  )
}

export default Signup