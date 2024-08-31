import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/entry_page/Login.jsx'
import Signup from './components/entry_page/Signup.jsx'
import Header from './components/entry_page/Header.jsx'
import Home from './components/entry_page/Home.jsx'
import Chat from './components/chat_page/Chat.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Profile from './components/user_data/Profile.jsx'

const router = createBrowserRouter([
  {
    path: '/user',
    element: <Header />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />
      }
    ]
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/chat',
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    )
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
