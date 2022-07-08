import React from 'react'
import { Link } from 'react-router-dom'
import './RegistrationSuccessModal.css'

interface RegistrationSuccessModalProps {
  setModal: Function
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
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <button
          onClick={() => {
            props.setModal(false)
          }}
        >
          GO TO LOGIN
        </button>
      </Link>
    </div>
  )
}

export default RegistrationSuccessModal
