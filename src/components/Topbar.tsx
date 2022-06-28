import React from 'react'
import './Topbar.css'
import { Search, Person, Notifications, Message } from '@mui/icons-material'
import { useAppDispatch } from '../app/hooks'
import { userLogout } from '../features/user-slice'

interface TopBarProps {
  setProfileClicked: Function
  setSendMessageClicked: Function
  setShowMessagesClicked: Function
}

const TopBar: React.FC<TopBarProps> = (props) => {
  const dispatch = useAppDispatch()

  return (
    <div id="topbar-wrapper">
      <div id="topbar-left">
        <span>NEXbook</span>
        <img src="https://freesvg.org/img/1312903882.png" id="book-logo" />
      </div>
      <div id="topbar-center">
        <input type="text" placeholder="search for content" />
        <Search></Search>
      </div>
      <div id="topbar-right">
        <span
          onClick={() => {
            props.setSendMessageClicked(false)
            props.setShowMessagesClicked(false)
            props.setProfileClicked(true)
          }}
        >
          <Person />
        </span>
        <span>
          <Notifications />
          <span id="notification-count">0</span>
        </span>
        <span
          onClick={() => {
            props.setSendMessageClicked(false)
            props.setProfileClicked(false)
            props.setShowMessagesClicked(true)
          }}
        >
          <Message />
          <span id="message-count">0</span>
        </span>
      </div>
      <span onClick={() => dispatch(userLogout())}>LOGOUT</span>
    </div>
  )
}

export default TopBar
