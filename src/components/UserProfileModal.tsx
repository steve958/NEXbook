import React, { useState } from 'react'
import './UserProfileModal.css'
import { Close, Edit } from '@mui/icons-material'
import { useAppSelector } from '../app/hooks'

interface UserProfileModalProps {
  setUserProfileClicked: Function
}

const UserProfileModal: React.FC<UserProfileModalProps> = (props) => {
  const [editInfoClicked, setEditInfoClicked] = useState<boolean>(false)
  const loggedUser = useAppSelector((state) => state.user.loggedUser)

  function handleChanges() {}

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
            <p>first name:</p>{' '}
            {editInfoClicked ? (
              <input type="text" defaultValue={loggedUser?.firstName} />
            ) : (
              <p>{loggedUser?.firstName}</p>
            )}
          </span>
          <span>
            <p>last name:</p>
            {editInfoClicked ? (
              <input type="text" defaultValue={loggedUser?.lastName} />
            ) : (
              <p>{loggedUser?.lastName}</p>
            )}
          </span>
          <span>
            <p>age:</p>
            {editInfoClicked ? (
              <input type="text" defaultValue={loggedUser?.age} />
            ) : (
              <p>{loggedUser?.age}</p>
            )}
          </span>
          <span>
            <p>profession:</p>
            {editInfoClicked ? (
              <input type="text" defaultValue={loggedUser?.profession} />
            ) : (
              <p>{loggedUser?.profession}</p>
            )}
          </span>
          <span>
            <p>username</p>
            {editInfoClicked ? (
              <input type="text" defaultValue={loggedUser?.userName} />
            ) : (
              <p>{loggedUser?.userName}</p>
            )}
          </span>
        </div>
        <span id="profile-picture-wrapper">
          <img id="profile-picture" src={loggedUser?.avatar} />
          {editInfoClicked ? (
            <input type="text" placeholder="paste URL of your avatar" />
          ) : null}
          <span
            id="edit-info-icon"
            onClick={() => setEditInfoClicked(!editInfoClicked)}
          >
            <Edit />
            <p>Edit your info</p>
          </span>
          {editInfoClicked && (
            <button onClick={handleChanges}>SAVE CHANGES</button>
          )}
        </span>
      </div>
    </div>
  )
}

export default UserProfileModal
