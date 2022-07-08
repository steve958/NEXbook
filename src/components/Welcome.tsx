import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import './Welcome.css'

interface WelcomeProps {}

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
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button data-testid="log" className="welcome-button">
            login
          </button>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button data-testid="reg" className="welcome-button">
            register
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Welcome
