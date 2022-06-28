import React, { useEffect, useState } from 'react'
import './App.css'
import { useAppSelector } from './app/hooks'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Register from './components/Register'
import UserContent from './components/UserContent'
const App: React.FC = () => {
  const [loginClicked, setLoginClicked] = useState(false)
  const [registerClicked, setRegisterClicked] = useState(false)
  const loggedIn = useAppSelector((state) => state.user.loggedIn)

  return (
    <div id="app-wrapper">
      {loggedIn && <UserContent />}
      {!loggedIn && (
        <Welcome
          setLoginClicked={setLoginClicked}
          setRegisterClicked={setRegisterClicked}
        />
      )}
      {loginClicked && <Login setLoginClicked={setLoginClicked} />}
      {registerClicked && (
        <Register
          setRegisterClicked={setRegisterClicked}
          setLoginClicked={setLoginClicked}
        />
      )}
    </div>
  )
}

export default App
