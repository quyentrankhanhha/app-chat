import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import './App.css'
import Chat from './components/Chat'
import SignIn from './components/SignIn'
import { auth } from './firebase'

const App = () => {
  const [user] = useAuthState(auth)
  return <>{user ? <Chat user={user} /> : <SignIn />}</>
}

export default App
