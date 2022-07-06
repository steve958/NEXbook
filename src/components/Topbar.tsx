import React, { useEffect, useState, useRef } from 'react'
import './Topbar.css'
import { Search, Person, Notifications, Message } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { userLogout, setLoggedUsersData } from '../features/user-slice'
import {
  filterFeedsById,
  filterUnseenMessagesCount,
  filterUnseenNotifications,
} from '../helpers/filters'
import { notificationsSeen } from '../helpers/ApiCalls'

interface TopBarProps {
  setProfileClicked: Function
  setSendMessageClicked: Function
  setShowMessagesClicked: Function
  setOtherUserProfileClicked: Function
  setUserNotificationsClicked: Function
  userNotificationsClicked: boolean
  setSearchQuery: Function
  searchQuery: string
}

const TopBar: React.FC<TopBarProps> = (props) => {
  const enteredQuery = useRef<HTMLInputElement>(null)
  const [count, setCount] = useState<number>(0)
  const [notifications, setNotifications] = useState<number>(0)
  const dispatch = useAppDispatch()
  const loggedUser = useAppSelector((state) => state.user.loggedUser)
  console.log(loggedUser)
  useEffect(() => {
    async function setCountInfo() {
      await setCount(filterUnseenMessagesCount(loggedUser?.inbox))
      await setNotifications(
        filterUnseenNotifications(loggedUser?.notifications),
      )
    }
    setCountInfo()
  }, [loggedUser])

  async function handleNotifications(id: string) {
    props.setUserNotificationsClicked(!props.userNotificationsClicked)
    const response = await notificationsSeen(id)
    console.log(response)
    dispatch(setLoggedUsersData(response))
  }

  return (
    <div id="topbar-wrapper">
      <div id="topbar-left">
        <span>NEXbook</span>
        <img src="https://freesvg.org/img/1312903882.png" id="book-logo" />
      </div>
      <div id="topbar-center">
        <input
          type="text"
          placeholder="search for feed content"
          ref={enteredQuery}
          onChange={() => props.setSearchQuery(enteredQuery.current?.value)}
          onClick={() => props.setSearchQuery('')}
          value={
            props.searchQuery
              ? filterFeedsById(props.searchQuery, loggedUser?.feeds)
              : ''
          }
        />
        <Search></Search>
      </div>
      <div id="topbar-right">
        <span
          onClick={() => {
            props.setOtherUserProfileClicked('')
            props.setSendMessageClicked(false)
            props.setShowMessagesClicked(false)
            props.setProfileClicked(true)
          }}
        >
          <Person />
        </span>
        <span onClick={() => handleNotifications(loggedUser!._id)}>
          <Notifications />
          <span id={notifications > 0 ? 'notification-count' : undefined}>
            {notifications > 0 ? notifications : null}
          </span>
        </span>
        <span
          onClick={() => {
            props.setSendMessageClicked(false)
            props.setProfileClicked(false)
            props.setShowMessagesClicked(true)
          }}
        >
          <Message />
          <span id={count > 0 ? 'message-count' : undefined}>
            {count > 0 ? count : null}
          </span>
        </span>
      </div>
      <span onClick={() => dispatch(userLogout())}>LOGOUT</span>
    </div>
  )
}

export default TopBar
