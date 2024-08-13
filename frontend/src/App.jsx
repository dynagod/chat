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
      <h1>Hey there</h1>
      <p>Users: {users.length}</p>

      {
        users.map((user) => (
          <div key={user.id}>
            <h3>{user.name} {user.admin ? "#": ""}</h3>
          </div>
        ))
      }
    </>
  )
}

export default App
