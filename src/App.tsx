import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useAppSelector } from './app/hooks'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Register from './components/Register'
import UserContent from './components/UserContent'
const App: React.FC = () => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn)

  return (
    <div id="app-wrapper">
      {loggedIn ? (
        <Routes>
          <Route
            path="/login"
            element={<Navigate to="/home" replace={true} />}
          ></Route>
          <Route
            path="/register"
            element={<Navigate to="/home" replace={true} />}
          ></Route>
          <Route path="/home" element={<UserContent />}></Route>
          <Route
            path="*"
            element={<Navigate to="/home" replace={true} />}
          ></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Welcome />}>
            Welcome
          </Route>
          <Route
            path="/login"
            element={
              <>
                <Welcome />
                <Login />
              </>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <>
                <Welcome />
                <Register />
              </>
            }
          ></Route>
          <Route
            path="/home"
            element={<Navigate to="/" replace={true} />}
          ></Route>
          <Route
            path="*"
            element={
              <h1 style={{ color: 'aliceblue', textAlign: 'center' }}>
                ERROR 404: THERE'S NOTHING HERE
              </h1>
            }
          ></Route>
        </Routes>
      )}
    </div>
  )
}

export default App
