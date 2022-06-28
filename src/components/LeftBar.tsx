import React, { useState, useEffect } from 'react'
import './LeftBar.css'
import { EmailOutlined } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { filterUser } from '../helpers/filters'
import { setLoggedUsersData } from '../features/user-slice'

interface LeftBarProps {
  setSendMessageClicked: Function
  setUserProfileClicked: Function
  setShowMessagesClicked: Function
  setSenderInformation: Function
}

const LeftBar: React.FC<LeftBarProps> = (props) => {
  const [sendMessageHover, setSendMessageHover] = useState<string>('')
  const allUsersData = useAppSelector((state) => state.user.allUsersData)
  const loggedUserName = useAppSelector((state) => state.user.loggedIn)
  const dispatch = useAppDispatch()
  const loggedUser = useAppSelector((state) => state.user.loggedUser)

  useEffect(() => {
    if (allUsersData && loggedUserName) {
      const user = filterUser(loggedUserName, allUsersData)
      dispatch(setLoggedUsersData(user))
    }
  })

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
        {allUsersData &&
          allUsersData
            .filter((user) => user.userName !== loggedUserName)
            .map((user) => {
              return (
                <div className="left-bar-users-wrapper" key={user._id}>
                  <img
                    className="left-bar-users-avatar"
                    src={user.avatar}
                    alt="photo"
                  />
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                  <span
                    onMouseEnter={() => setSendMessageHover(user._id)}
                    onMouseLeave={() => setSendMessageHover('')}
                    onClick={() => {
                      props.setSendMessageClicked(true)
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
            })}
      </div>
    </div>
  )
}

export default LeftBar
