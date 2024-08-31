import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Header from '../home_page/Header';

const Home = () => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showOption, setShowOption] = useState(false);

  useEffect(() => {
    axios.get('/api/v1/user/verify-token')
    .then((response) => {
      setUserData(response.data.data);
      console.log(response.data.data);
      setUser(true);
    })
    .catch((error) => {})
  }, [])

  return (
    <>
    <div className='min-h-screen bg-[url("/images/entrypage.jpg")] bg-cover'>
      <Header />
      <div className="w-full text-white">
        Chat with your friend !!
        <Link to='/chat'>Click here to chat</Link>
      </div>
    </div>
    </>
  )
}

export default Home