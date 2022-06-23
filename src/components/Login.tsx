import React, { ReactEventHandler } from 'react'

interface LoginProps {
  setLoading: Function
  setLoginClicked: Function
}

const Login: React.FC<LoginProps> = (props) => {
  function handleLogin(event: any) {
    event.preventDefault()
    props.setLoading(true)
    props.setLoginClicked(false)
  }

  return (
    <div id="form-wrapper" data-testid="login-form">
      <form>
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <button className="form-button" onClick={(e) => handleLogin(e)}>
          LOGIN
        </button>
      </form>
    </div>
  )
}

export default Login
