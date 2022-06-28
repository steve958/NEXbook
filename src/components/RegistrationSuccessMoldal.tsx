import React from 'react'
import './RegistrationSuccessModal.css'

interface RegistrationSuccessModalProps {
  setModal: Function
  setLoginClicked: Function
  setRegisterClicked: Function
}

const RegistrationSuccessModal: React.FC<RegistrationSuccessModalProps> = (
  props,
) => {
  return (
    <div id="registration-success-container">
      <h1>Congratulations</h1>
      <div id="registration-success-wrapper">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Check-Logo.png"
          alt=""
        />
      </div>
      <p>You have successfully registered</p>
      <p>Proceed to login and type in your username and password</p>
      <button
        onClick={() => {
          props.setLoginClicked(true)
          props.setModal(false)
          props.setRegisterClicked(false)
        }}
      >
        GO TO LOGIN
      </button>
    </div>
  )
}

export default RegistrationSuccessModal
