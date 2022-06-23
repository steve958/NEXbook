import React, { useEffect, useState } from 'react'
import './App.css'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Register from './components/Register'

import UserContent from './components/UserContent'

const App: React.FC = () => {
  const [loginClicked, setLoginClicked] = useState(false)
  const [registerClicked, setRegisterClicked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3090/subscribers`)
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [])

  return (
    <div id="app-wrapper">
      {loading && <UserContent setLoading={setLoading} />}
      {!loading && (
        <Welcome
          setLoginClicked={setLoginClicked}
          setRegisterClicked={setRegisterClicked}
        />
      )}
      {loginClicked && (
        <Login setLoading={setLoading} setLoginClicked={setLoginClicked} />
      )}
      {registerClicked && (
        <Register
          setLoading={setLoading}
          setRegisterClicked={setRegisterClicked}
        />
      )}
    </div>
  )
}

export default App
