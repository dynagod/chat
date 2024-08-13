import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('/api/users')
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <>
      <div className='bg-zinc-900 text-white h-screen'>
      <h1 className='bg-green-500 text-4xl text-center p-4'>Hey there</h1>
      <p className='text-red-800 text-2xl mt-6 text-center'>Users: {users.length}</p>

      <div className='flex justify-around'>
      {
        users.map((user) => (
          <div key={user.id}>
            <h3 className='text-blue-800'>{user.name} {user.admin ? "#": ""}</h3>
          </div>
        ))
      }
      </div>
      </div>
    </>
  )
}

export default App
