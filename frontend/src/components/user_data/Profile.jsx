import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../home_page/Header';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('/api/v1/user/verify-token')
    .then((response) => {
      setUserData(response.data.data);
      console.log(response.data.data);
    })
    .catch((error) => {})
  }, [])
  return (
    <>
    <div className='bg-zinc-800 min-h-screen'>
      <Header />
      <div className='h-20 w-20 rounded-full overflow-hidden mr-1'>
        <img src={userData?.profile} alt="" className='h-full w-full object-cover'/>
      </div>
    </div>
    </>
  )
}

export default Profile