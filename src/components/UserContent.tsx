import React, { useState, useEffect } from 'react'
import './UserContent.css'
import TopBar from './Topbar'
import LeftBar from './LeftBar'
import RightBar from './RightBar'
import Feed from './Feed'
import SendMessageModal from './SendMessageModal'
import UserProfileModal from './UserProfileModal'
import ShowMessagesModal from './ShowMessagesModal'
import UserNotificationsModal from './UserNotificationsModal'
import { fetchAllUsers, onlyLoggedUser } from '../helpers/ApiCalls'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setInitialUsersdata, setLoggedUsersData } from '../features/user-slice'

interface UserProps {}

const UserContent: React.FC<UserProps> = (props) => {
  const [changes, setChanges] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sendMessageClicked, setSendMessageClicked] = useState<boolean>(false)
  const [userProfileClicked, setUserProfileClicked] = useState<boolean>(false)
  const [userNotificationsClicked, setUserNotificationClicked] = useState<
    boolean
  >(false)
  const [otherUserProfileClicked, setOtherUserProfileClicked] = useState<
    string
  >('')
  const [showMessagesClicked, setShowMessagesClicked] = useState<boolean>(false)
  const [senderInformation, setSenderInformation] = useState<{
    id: string
    avatar: string
    firstName: string
  } | null>(null)

  const dispatch = useAppDispatch()
  const userID = useAppSelector((state) => state.user.loggedInId)
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllUsers()
      dispatch(setInitialUsersdata(data))
      const userData = await onlyLoggedUser(userID)
      dispatch(setLoggedUsersData(userData))
      console.log(userData)
    }
    fetchData()
  }, [changes])

  return (
    <div id="user-content-wrapper">
      {showMessagesClicked && (
        <ShowMessagesModal setShowMessagesClicked={setShowMessagesClicked} />
      )}
      {userProfileClicked && (
        <UserProfileModal
          setUserProfileClicked={setUserProfileClicked}
          setOtherUserProfileClicked={setOtherUserProfileClicked}
          otherUserProfileClicked={otherUserProfileClicked}
        />
      )}
      {sendMessageClicked && (
        <SendMessageModal
          setSendMessageClicked={setSendMessageClicked}
          senderInformation={senderInformation}
        />
      )}
      <TopBar
        setProfileClicked={setUserProfileClicked}
        setSendMessageClicked={setSendMessageClicked}
        setShowMessagesClicked={setShowMessagesClicked}
        setOtherUserProfileClicked={setOtherUserProfileClicked}
        setUserNotificationsClicked={setUserNotificationClicked}
        userNotificationsClicked={userNotificationsClicked}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />
      {userNotificationsClicked && (
        <UserNotificationsModal setSearchQuery={setSearchQuery} />
      )}
      <div id="content-container">
        <LeftBar
          setSendMessageClicked={setSendMessageClicked}
          setUserProfileClicked={setUserProfileClicked}
          setShowMessagesClicked={setShowMessagesClicked}
          setSenderInformation={setSenderInformation}
          setOtherUserProfileClicked={setOtherUserProfileClicked}
        />
        <Feed
          setChanges={setChanges}
          changes={changes}
          searchQuery={searchQuery}
        />
        <RightBar />
      </div>
    </div>
  )
}

export default UserContent
