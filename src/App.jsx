import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function App() {
    const {authUser} = useContext(AuthContext)
  return (
    <div className="bg-[url('/bgImage.jpg')] bg-cover">
      <Toaster />
      <Routes>
        <Route path='/' element={ authUser ? <HomePage /> : <Navigate to='/login' /> }/>
        <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to='/' /> }/>
        <Route path='/profile' element={ authUser ? <ProfilePage /> : <Navigate to='/login' /> }/>
      </Routes>
    </div>
  )
}

export default App
