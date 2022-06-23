import React, { useState, Suspense } from 'react'
import './UserContent.css'
import Loading from './Loading'
import TopBar from './Topbar'
import LeftBar from './LeftBar'
import RightBar from './RightBar'
import Feed from './Feed'
import SendMessageModal from './SendMessageModal'
import UserProfileModal from './UserProfileModal'
import ShowMessagesModal from './ShowMessagesModal'

interface UserProps {
  setLoading: Function
}

const UserContent: React.FC<UserProps> = (props) => {
  const [sendMessageClicked, setSendMessageClicked] = useState<boolean>(false)
  const [userProfileClicked, setUserProfileClicked] = useState<boolean>(false)
  const [showMessagesClicked, setShowMessagesClicked] = useState<boolean>(false)

  return (
    <div id="user-content-wrapper">
      {showMessagesClicked && (
        <ShowMessagesModal setShowMessagesClicked={setShowMessagesClicked} />
      )}
      {userProfileClicked && (
        <UserProfileModal setUserProfileClicked={setUserProfileClicked} />
      )}
      {sendMessageClicked && (
        <SendMessageModal setSendMessageClicked={setSendMessageClicked} />
      )}
      <TopBar
        setLoading={props.setLoading}
        setProfileClicked={setUserProfileClicked}
        setSendMessageClicked={setSendMessageClicked}
        setShowMessagesClicked={setShowMessagesClicked}
      />
      <div id="content-container">
        <LeftBar
          setSendMessageClicked={setSendMessageClicked}
          setUserProfileClicked={setUserProfileClicked}
          setShowMessagesClicked={setShowMessagesClicked}
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
