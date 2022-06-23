import React, { useRef } from 'react'

interface RegisterProps {
  setLoading: Function
  setRegisterClicked: Function
}

const Register: React.FC<RegisterProps> = (props) => {
  const registerInputFirstName = useRef<HTMLInputElement>(null)
  const registerInputLastName = useRef<HTMLInputElement>(null)
  const registerInputAvatar = useRef<HTMLInputElement>(null)
  const registerInputAge = useRef<HTMLInputElement>(null)
  const registerInputProfession = useRef<HTMLInputElement>(null)
  const registerInputEmail = useRef<HTMLInputElement>(null)
  const registerInputPassword = useRef<HTMLInputElement>(null)

  const registrationSubmit = (
    first_name: string,
    last_name: string,
    avatar: string,
    age: string,
    profession: string,
    email: string,
    password: string,
  ) => {
    return {
      first_name,
      last_name,
      avatar,
      age,
      profession,
      status: [],
      messages: [],
      email,
      password,
    }
  }

  function handleRegister(event: any) {
    event.preventDefault()
    props.setLoading(true)
    props.setRegisterClicked(false)

    const enteredFirstName = registerInputFirstName.current!.value
    const enteredLastName = registerInputLastName.current!.value
    const enteredAvatar = registerInputAvatar.current!.value
    const enteredAge = registerInputAge.current!.value
    const enteredProfession = registerInputProfession.current!.value
    const enteredEmail = registerInputEmail.current!.value
    const enteredPassword = registerInputPassword.current!.value

    fetch('https://62a703ea97b6156bff850657.mockapi.io/api/vi/Users', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        registrationSubmit(
          enteredFirstName,
          enteredLastName,
          enteredAvatar,
          enteredAge,
          enteredProfession,
          enteredEmail,
          enteredPassword,
        ),
      ),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }
  return (
    <div id="form-wrapper">
      <form>
        <input
          type="text"
          placeholder="firstname"
          ref={registerInputFirstName}
        />
        <input type="text" placeholder="lastname" ref={registerInputLastName} />
        <input type="text" placeholder="avatar" ref={registerInputAvatar}/>
        <input type="number" placeholder="age" ref={registerInputAge} />
        <input
          type="text"
          placeholder="profession"
          ref={registerInputProfession}
        />
        <input type="text" placeholder="email" ref={registerInputEmail} />
        <input
          type="password"
          placeholder="password"
          ref={registerInputPassword}
        />
        <button className="form-button" onClick={(e) => handleRegister(e)}>
          REGISTER
        </button>
      </form>
    </div>
  )
}

export default Register
