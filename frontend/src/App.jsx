import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Header from './components/entry_page/Header'

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
      <Header />
    </>
  )
}

export default App
