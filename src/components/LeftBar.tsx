import React, { useState, useRef } from 'react'
import './LeftBar.css'
import { EmailOutlined } from '@mui/icons-material'
import { useAppSelector } from '../app/hooks'

interface LeftBarProps {
  setSendMessageClicked: Function
  setUserProfileClicked: Function
  setShowMessagesClicked: Function
  setSenderInformation: Function
  setOtherUserProfileClicked: Function
}

const LeftBar: React.FC<LeftBarProps> = (props) => {
  const [sendMessageHover, setSendMessageHover] = useState<string>('')
  const [nameQuery, setNameQuery] = useState<string>('')
  const enteredName = useRef<HTMLInputElement>(null)
  let allUsersData = useAppSelector((state) => state.user.allUsersData)
  let loggedUserName = useAppSelector((state) => state.user.loggedIn)
  let loggedUser = useAppSelector((state) => state.user.loggedUser)

  function usersDataFiltered() {
    return allUsersData!
      .filter((user) => user.userName !== loggedUserName)
      .filter(
        (user) =>
          user.firstName.toLowerCase().includes(nameQuery) ||
          user.lastName.toLowerCase().includes(nameQuery),
      )
      .map((user) => {
        return (
          <div className="left-bar-users-wrapper" key={user._id}>
            <img
              className="left-bar-users-avatar"
              src={user.avatar}
              alt="photo"
              onClick={() => {
                props.setUserProfileClicked(true)
                props.setOtherUserProfileClicked(user.userName)
              }}
            />
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <span
              onMouseEnter={() => setSendMessageHover(user._id)}
              onMouseLeave={() => setSendMessageHover('')}
              onClick={() => {
                props.setSendMessageClicked(true)
                props.setOtherUserProfileClicked('')
                props.setUserProfileClicked(false)
                props.setShowMessagesClicked(false)
                props.setSenderInformation({
                  id: user._id,
                  avatar: user.avatar,
                  firstName: user.firstName,
                })
              }}
              className="send-message-icon"
            >
              {sendMessageHover === user._id ? (
                <p id="hover-text-send-message">SEND MESSAGE</p>
              ) : (
                <EmailOutlined />
              )}
            </span>
          </div>
        )
      })
  }

  function usersData() {
    return allUsersData!
      .filter((user) => user.userName !== loggedUserName)
      .map((user) => {
        return (
          <div className="left-bar-users-wrapper" key={user._id}>
            <img
              className="left-bar-users-avatar"
              src={user.avatar}
              alt="photo"
              onClick={() => {
                props.setUserProfileClicked(true)
                props.setOtherUserProfileClicked(user.userName)
              }}
            />
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <span
              onMouseEnter={() => setSendMessageHover(user._id)}
              onMouseLeave={() => setSendMessageHover('')}
              onClick={() => {
                props.setSendMessageClicked(true)
                props.setOtherUserProfileClicked('')
                props.setUserProfileClicked(false)
                props.setShowMessagesClicked(false)
                props.setSenderInformation({
                  id: user._id,
                  avatar: user.avatar,
                  firstName: user.firstName,
                })
              }}
              className="send-message-icon"
            >
              {sendMessageHover === user._id ? (
                <p className="hover-texe">SEND MESSAGE</p>
              ) : (
                <EmailOutlined />
              )}
            </span>
          </div>
        )
      })
  }

  return (
    <div id="left-bar-wrapper">
      <img
        id="left-bar-avatar"
        src={loggedUser ? `${loggedUser.avatar}` : undefined}
        alt="photo"
      />
      <h1>Hello {loggedUser ? `${loggedUser.firstName}` : null}</h1>
      <div id="left-bar-users-list">
        <h3>Send a message to other NEXbook users</h3>
        <input
          type="text"
          placeholder="search users by name"
          id="name-query"
          ref={enteredName}
          onChange={() => setNameQuery(enteredName.current!.value)}
        />
        {nameQuery
          ? allUsersData && usersDataFiltered()
          : allUsersData && usersData()}
      </div>
    </div>
  )
}

export default LeftBar
