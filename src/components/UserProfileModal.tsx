import React from 'react'
import './UserProfileModal.css'
import { Close } from '@mui/icons-material'

interface UserProfileModalProps {
  setUserProfileClicked: Function
}

const UserProfileModal: React.FC<UserProfileModalProps> = (props) => {
  return (
    <div id="user-profile-modal">
      <span
        id="user-profile-modal-close-icon"
        onClick={() => props.setUserProfileClicked(false)}
      >
        <Close />
      </span>
      <div id="user-profile-wrapper">
        <div id="user-profile-data">
          <h1>YOUR PROFILE DATA</h1>
          <span>
            <p>first name:</p> <p>STEVE</p>
          </span>
          <span>
            <p>last name:</p>
            <p> NEX</p>
          </span>
          <span>
            <p>age:</p>
            <p>31</p>
          </span>
          <span>
            <p>profession:</p>
            <p>SCIENTIST</p>
          </span>
          <span>
            <p>email:</p>
            <p>stevenex@gmail.com</p>
          </span>
        </div>
        <img
          id="profile-picture"
          src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105561/126045782-vector-illustration-of-avatar-and-dummy-sign-collection-of-avatar-and-image-stock-symbol-for-web-.jpg"
        />
      </div>
    </div>
  )
}

export default UserProfileModal
