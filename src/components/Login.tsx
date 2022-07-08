import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, onlyLoggedUser } from '../helpers/ApiCalls'
import {
  setLoggedUsersData,
  userLogin,
  userLoginId,
} from '../features/user-slice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Error from './Error'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  let enteredUserName = useRef<HTMLInputElement>(null)
  let enteredPassword = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [visibilityClicked, setVisibilityClicked] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  async function handleLogin(event: any) {
    event.preventDefault()

    if (enteredUserName.current?.value && enteredPassword.current?.value) {
      let userName = enteredUserName.current!.value
      let pass = enteredPassword.current!.value
      const response = await loginUser(userName, pass)
      enteredUserName.current!.value = ''
      enteredPassword.current!.value = ''
      if (response === 'Access denied' || response === 'Cannot find user') {
        setErrorMessage(response)
      } else {
        dispatch(userLogin(userName))
        dispatch(userLoginId(response))
        const userData = await onlyLoggedUser(response)
        dispatch(setLoggedUsersData(userData))
        navigate('/home')
      }
    } else {
      setErrorMessage('Please fill all the input fields')
    }
  }

  return (
    <div id="form-wrapper" data-testid="login-form">
      <form>
        <input type="text" placeholder="username" ref={enteredUserName} />
        <input
          type={visibilityClicked ? 'text' : 'password'}
          placeholder="password"
          ref={enteredPassword}
        />
        <span
          id="password-visibility"
          onMouseDown={() => setVisibilityClicked(true)}
          onMouseUp={() => setVisibilityClicked(false)}
        >
          <VisibilityOutlinedIcon />
        </span>
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
