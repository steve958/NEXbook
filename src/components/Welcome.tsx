import React, { Suspense } from 'react'
import './Welcome.css'

interface WelcomeProps {
  setLoginClicked: Function
  setRegisterClicked: Function
}

const Welcome: React.FC<WelcomeProps> = (props) => {
  return (
    <div id="welcome-container">
      <h1 data-testid="header-text">welcome to</h1>
      <span id="welcome-text" data-testid="app-name">
        NEXbook
      </span>
      <Suspense fallback={<p>loading...</p>}>
        <img
          src="https://freesvg.org/img/1312903882.png"
          alt="loading..."
          id="welcome-logo"
          data-testid="app-logo-background"
        />
      </Suspense>
      <div id="welcome-wrapper">
        <button
          data-testid="log"
          className="welcome-button"
          onClick={() => {
            props.setLoginClicked(true)
            props.setRegisterClicked(false)
          }}
        >
          Click to login
        </button>
        <button
          data-testid="reg"
          className="welcome-button"
          onClick={() => {
            props.setLoginClicked(false)
            props.setRegisterClicked(true)
          }}
        >
          Click to register
        </button>
      </div>
    </div>
  )
}

export default Welcome
