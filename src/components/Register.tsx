import React, { useRef, useState } from 'react'
import { registerUser } from '../helpers/ApiCalls'
import Error from './Error'
import RegistrationSuccessModal from './RegistrationSuccessMoldal'

interface RegisterProps {
  setRegisterClicked: Function
  setLoginClicked: Function
}

const Register: React.FC<RegisterProps> = (props) => {
  const registerInputFirstName = useRef<HTMLInputElement>(null)
  const registerInputLastName = useRef<HTMLInputElement>(null)
  const registerInputAvatar = useRef<HTMLInputElement>(null)
  const registerInputAge = useRef<HTMLInputElement>(null)
  const registerInputProfession = useRef<HTMLInputElement>(null)
  const registerInputUserName = useRef<HTMLInputElement>(null)
  const registerInputPassword = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successRegistration, setSuccessRegistration] = useState<boolean>(false)

  function handleEmpty(event: any) {
    event.preventDefault()
  }

  async function handleRegister(event: any) {
    event.preventDefault()
    if (
      registerInputFirstName.current?.value &&
      registerInputLastName.current?.value &&
      registerInputAvatar.current?.value &&
      registerInputAge.current?.value &&
      registerInputProfession.current?.value &&
      registerInputUserName.current?.value &&
      registerInputPassword.current?.value
    ) {
      const enteredFirstName = registerInputFirstName.current!.value
      const enteredLastName = registerInputLastName.current!.value
      const enteredAvatar = registerInputAvatar.current!.value
      const enteredAge = registerInputAge.current!.value
      const enteredProfession = registerInputProfession.current!.value
      const enteredUserName = registerInputUserName.current!.value
      const enteredPassword = registerInputPassword.current!.value

      const response = await registerUser(
        enteredFirstName,
        enteredLastName,
        enteredAvatar,
        enteredAge,
        enteredProfession,
        enteredUserName,
        enteredPassword,
      )
      console.log(response)
      if (response === 'Successful registration') {
        setSuccessRegistration(!successRegistration)
      } else {
        setErrorMessage(response.message)
      }
    } else {
      setErrorMessage('Please fill all the input fields')
    }
  }
  return (
    <div id="form-wrapper" data-testid="register-form">
      <form>
        <input
          type="text"
          placeholder="firstname"
          ref={registerInputFirstName}
        />
        <input type="text" placeholder="lastname" ref={registerInputLastName} />
        <input
          type="text"
          placeholder="paste URL of your avatar"
          ref={registerInputAvatar}
        />
        <input type="number" placeholder="age" ref={registerInputAge} />
        <input
          type="text"
          placeholder="profession"
          ref={registerInputProfession}
        />
        <input type="text" placeholder="username" ref={registerInputUserName} />
        <input
          type="password"
          placeholder="password"
          ref={registerInputPassword}
        />
        <button
          className="form-button"
          onClick={
            errorMessage || successRegistration
              ? (e) => handleEmpty(e)
              : (e) => handleRegister(e)
          }
          id={errorMessage || successRegistration ? 'disabled' : 'empty'}
        >
          REGISTER
        </button>
      </form>
      {errorMessage && (
        <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      )}
      {successRegistration && (
        <RegistrationSuccessModal
          setModal={setSuccessRegistration}
          setLoginClicked={props.setLoginClicked}
          setRegisterClicked={props.setRegisterClicked}
        />
      )}
    </div>
  )
}

export default Register
