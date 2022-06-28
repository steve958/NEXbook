import React from 'react'
import './Error.css'

interface ErrorProps {
  errorMessage: string
  setErrorMessage: Function
}

const Error: React.FC<ErrorProps> = (props) => {
  return (
    <div id="error-container">
      <h1>SORRY</h1>
      <div id="error-wrapper">
        <img
          src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131__340.png"
          alt=""
        />
      </div>
      <p>
        {props.errorMessage === 'Cannot find user' ||
        props.errorMessage === 'Access denied' ||
        props.errorMessage === 'Please fill all the input fields'
          ? props.errorMessage
          : null}
      </p>
      <p>
        {props.errorMessage === 'Please fill all the input fields'
          ? 'Every input field is mandatory'
          : props.errorMessage === 'Cannot find user' ||
            props.errorMessage === 'Access denied'
          ? 'Incorect username or password'
          : 'Username is already taken'}
      </p>
      <button onClick={() => props.setErrorMessage('')}>TRY AGAIN</button>
    </div>
  )
}

export default Error
