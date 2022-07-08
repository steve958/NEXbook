import React, { useState, useRef, useEffect } from 'react'
import './UserProfileModal.css'
import { Close, Edit } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { patchHelper } from '../helpers/patchHelper'
import { editUser, onlyLoggedUser } from '../helpers/ApiCalls'
import { setLoggedUsersData } from '../features/user-slice'
import { filterUser } from '../helpers/filters'

interface UserProfileModalProps {
  setUserProfileClicked: Function
  setOtherUserProfileClicked: Function
  otherUserProfileClicked: string
}

const UserProfileModal: React.FC<UserProfileModalProps> = (props) => {
  const [editInfoClicked, setEditInfoClicked] = useState<boolean>(false)
  const enteredFirstName = useRef<HTMLInputElement>(null)
  const enteredLastName = useRef<HTMLInputElement>(null)
  const enteredAvatar = useRef<HTMLInputElement>(null)
  const enteredAge = useRef<HTMLInputElement>(null)
  const enteredProfession = useRef<HTMLInputElement>(null)
  const enteredUserName = useRef<HTMLInputElement>(null)
  let allUsers = useAppSelector((state) => state.user.allUsersData)
  let loggedUser = useAppSelector((state) => state.user.loggedUser)
  const dispatch = useAppDispatch()
  async function handleChanges() {
    const firstName = enteredFirstName.current!.value
    const lastName = enteredLastName.current!.value
    const avatar = enteredAvatar.current!.value || loggedUser?.avatar
    const age = enteredAge.current!.value
    const profession = enteredProfession.current!.value
    const userName = enteredUserName.current!.value

    const payload = {
      ...patchHelper(),
      firstName,
      lastName,
      avatar,
      age,
      profession,
      userName,
    }

    const response = await editUser(loggedUser!._id, payload)
    setEditInfoClicked(!editInfoClicked)
    const userData = await onlyLoggedUser(loggedUser!._id)
    dispatch(setLoggedUsersData(userData))
  }

  function loggedUserData() {
    return (
      <div id="user-profile-wrapper">
        <div id="user-profile-data">
          <h1>YOUR PROFILE DATA</h1>
          <span>
            <p>first name:</p>{' '}
            {editInfoClicked ? (
              <input
                type="text"
                defaultValue={loggedUser?.firstName}
                ref={enteredFirstName}
              />
            ) : (
              <p>{loggedUser?.firstName}</p>
            )}
          </span>
          <span>
            <p>last name:</p>
            {editInfoClicked ? (
              <input
                type="text"
                defaultValue={loggedUser?.lastName}
                ref={enteredLastName}
              />
            ) : (
              <p>{loggedUser?.lastName}</p>
            )}
          </span>
          <span>
            <p>age:</p>
            {editInfoClicked ? (
              <input
                type="text"
                defaultValue={loggedUser?.age}
                ref={enteredAge}
              />
            ) : (
              <p>{loggedUser?.age}</p>
            )}
          </span>
          <span>
            <p>profession:</p>
            {editInfoClicked ? (
              <input
                type="text"
                defaultValue={loggedUser?.profession}
                ref={enteredProfession}
              />
            ) : (
              <p>{loggedUser?.profession}</p>
            )}
          </span>
          <span>
            <p>username</p>
            {editInfoClicked ? (
              <input
                type="text"
                defaultValue={loggedUser?.userName}
                ref={enteredUserName}
              />
            ) : (
              <p>{loggedUser?.userName}</p>
            )}
          </span>
        </div>
        <span id="profile-picture-wrapper">
          <img id="profile-picture" src={loggedUser?.avatar} />
          {editInfoClicked ? (
            <input
              type="text"
              placeholder="paste new URL to change your avatar"
              ref={enteredAvatar}
            />
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
    )
  }

  function otherUserData() {
    return (
      <div id="user-profile-wrapper">
        <div id="user-profile-data" className="other-profile">
          <h1>
            {filterUser(props.otherUserProfileClicked, allUsers).userName}
          </h1>
          <span>
            <p>first name: </p>
            <p>
              {filterUser(props.otherUserProfileClicked, allUsers).firstName}
            </p>
          </span>
          <span>
            <p>last name: </p>
            <p>
              {filterUser(props.otherUserProfileClicked, allUsers).lastName}
            </p>
          </span>
          <span>
            <p>age: </p>
            <p> {filterUser(props.otherUserProfileClicked, allUsers).age}</p>
          </span>
          <span>
            <p>profession: </p>
            <p>
              {filterUser(props.otherUserProfileClicked, allUsers).profession}
            </p>
          </span>
        </div>
        <span id="profile-picture-wrapper">
          <img
            id="profile-picture"
            src={filterUser(props.otherUserProfileClicked, allUsers).avatar}
          />
        </span>
      </div>
    )
  }

  return (
    <div id="user-profile-modal">
      <span
        id="user-profile-modal-close-icon"
        onClick={() => {
          props.setUserProfileClicked(false)
          props.setOtherUserProfileClicked('')
        }}
      >
        <Close />
      </span>
      {props.otherUserProfileClicked ? otherUserData() : loggedUserData()}
    </div>
  )
}

export default UserProfileModal
