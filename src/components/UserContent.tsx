import React, { useState, Suspense, useEffect } from 'react'
import './UserContent.css'
import Loading from './Loading'
import TopBar from './Topbar'
import LeftBar from './LeftBar'
import RightBar from './RightBar'
import Feed from './Feed'
import SendMessageModal from './SendMessageModal'
import UserProfileModal from './UserProfileModal'
import ShowMessagesModal from './ShowMessagesModal'
import { fetchAllUsers } from '../helpers/ApiCalls'
import { useAppDispatch } from '../app/hooks'
import { setInitialUsersdata } from '../features/user-slice'

interface UserProps {}

const UserContent: React.FC<UserProps> = (props) => {
  const [sendMessageClicked, setSendMessageClicked] = useState<boolean>(false)
  const [userProfileClicked, setUserProfileClicked] = useState<boolean>(false)
  const [showMessagesClicked, setShowMessagesClicked] = useState<boolean>(false)
  const [senderInformation, setSenderInformation] = useState<{
    id: string
    avatar: string
    firstName: string
  } | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllUsers()
      dispatch(setInitialUsersdata(data))
    }
    fetchData()
  })

  return (
    <div id="user-content-wrapper">
      {showMessagesClicked && (
        <ShowMessagesModal setShowMessagesClicked={setShowMessagesClicked} />
      )}
      {userProfileClicked && (
        <UserProfileModal setUserProfileClicked={setUserProfileClicked} />
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
      />
      <div id="content-container">
        <LeftBar
          setSendMessageClicked={setSendMessageClicked}
          setUserProfileClicked={setUserProfileClicked}
          setShowMessagesClicked={setShowMessagesClicked}
          setSenderInformation={setSenderInformation}
        />
        <Feed />
        <Suspense fallback={<Loading />}>
          <RightBar />
        </Suspense>
      </div>
    </div>
  )
}

export default UserContent
