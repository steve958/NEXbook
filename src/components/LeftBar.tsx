import React, { useState, Suspense } from 'react'
import './LeftBar.css'
import { EmailOutlined } from '@mui/icons-material'
import Loading from './Loading'

interface LeftBarProps {
  setSendMessageClicked: Function
  setUserProfileClicked: Function
  setShowMessagesClicked: Function
}

const LeftBar: React.FC<LeftBarProps> = (props) => {
  const [sendMessageHover, setSendMessageHover] = useState<boolean>(false)

  return (
    <div id="left-bar-wrapper">
      <img
        id="left-bar-avatar"
        src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105561/126045782-vector-illustration-of-avatar-and-dummy-sign-collection-of-avatar-and-image-stock-symbol-for-web-.jpg"
        alt=""
      />
      <h1>Hello Steve</h1>
      <div id="left-bar-users-list">
        <h3>Send a message to other NEXbook users</h3>
        <div className="left-bar-users-wrapper">
          <Suspense fallback={<Loading />}>
            <img
              className="left-bar-users-avatar"
              src="https://freesvg.org/img/1459344336.png"
              alt="photo"
            />
          </Suspense>
          <h3>User 1</h3>
          <span
            onMouseEnter={() => setSendMessageHover(true)}
            onMouseLeave={() => setSendMessageHover(false)}
            onClick={() => {
              props.setSendMessageClicked(true)
              props.setUserProfileClicked(false)
              props.setShowMessagesClicked(false)
            }}
            className="send-message-icon"
          >
            {sendMessageHover ? (
              <p className="hover-texe">SEND MESSAGE</p>
            ) : (
              <EmailOutlined />
            )}
          </span>
        </div>
        <div className="left-bar-users-wrapper">
          <img
            className="left-bar-users-avatar"
            src="https://freesvg.org/img/1459344336.png"
            alt=""
          />
          <h3>User 1</h3>
          <EmailOutlined />
        </div>
        <div className="left-bar-users-wrapper">
          <img
            className="left-bar-users-avatar"
            src="https://freesvg.org/img/1459344336.png"
            alt=""
          />
          <h3>User 1</h3>
          <EmailOutlined />
        </div>
        <div className="left-bar-users-wrapper">
          <img
            className="left-bar-users-avatar"
            src="https://freesvg.org/img/1459344336.png"
            alt=""
          />
          <h3>User 1</h3>
          <EmailOutlined />
        </div>
        <div className="left-bar-users-wrapper">
          <img
            className="left-bar-users-avatar"
            src="https://freesvg.org/img/1459344336.png"
            alt=""
          />
          <h3>User 1</h3>
          <EmailOutlined />
        </div>
        <div className="left-bar-users-wrapper">
          <img
            className="left-bar-users-avatar"
            src="https://freesvg.org/img/1459344336.png"
            alt=""
          />
          <h3>User 1</h3>
          <EmailOutlined />
        </div>
        <div className="left-bar-users-wrapper">
          <img
            className="left-bar-users-avatar"
            src="https://freesvg.org/img/1459344336.png"
            alt=""
          />
          <h3>User 1</h3>
          <EmailOutlined />
        </div>
      </div>
    </div>
  )
}

export default LeftBar
