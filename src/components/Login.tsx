import React, { useRef, useState } from 'react'
import { loginUser } from '../helpers/ApiCalls'
import { userLogin } from '../features/user-slice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Error from './Error'

interface LoginProps {
  setLoginClicked: Function
}

const Login: React.FC<LoginProps> = (props) => {
  let enteredUserName = useRef<HTMLInputElement>(null)
  let enteredPassword = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const dispatch = useAppDispatch()
  async function handleLogin(event: any) {
    event.preventDefault()

    if (enteredUserName.current?.value && enteredPassword.current?.value) {
      let userName = enteredUserName.current!.value
      let pass = enteredPassword.current!.value
      const response = await loginUser(userName, pass)
      console.log(response)
      enteredUserName.current!.value = ''
      enteredPassword.current!.value = ''
      if (response !== 'Success') {
        setErrorMessage(response)
      } else {
        dispatch(userLogin(userName))
        props.setLoginClicked(false)
      }
    } else {
      setErrorMessage('Please fill all the input fields')
    }
  }

  return (
    <div id="form-wrapper" data-testid="login-form">
      <form>
        <input type="text" placeholder="username" ref={enteredUserName} />
        <input type="password" placeholder="password" ref={enteredPassword} />
        <button className="form-button" onClick={(e) => handleLogin(e)}>
          LOGIN
        </button>
      </form>
      {errorMessage && (
        <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      )}
    </div>
  )
}

export default Login
