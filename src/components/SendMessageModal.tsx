import React, { useState } from 'react'
import './SendMessageModal.css'
import { Close, Send } from '@mui/icons-material'

interface SendMessageProps {
  setSendMessageClicked: Function
}

const SendMessageModal: React.FC<SendMessageProps> = (props) => {

  const [sendButtonHover, setSendButtonHover] = useState<boolean>(false)

  return (
    <div id="send-message-modal">
      <div id="send-message-wrapper">
        <span id="close-modal-icon" onClick={() => props.setSendMessageClicked(false)}>
          <Close />
        </span>
        <h1>Send a message to </h1>
        <img
          className="send-message-user-avatar"
          src="https://freesvg.org/img/1459344336.png"
          alt=""
        />
      </div>
      <textarea
        id="send-message-text-area"
        placeholder="Hello User 1..."
      ></textarea>
      <button
        id="send-button"
        onClick={() => props.setSendMessageClicked(false)}
        onMouseEnter={()=> setSendButtonHover(true)}
        onMouseLeave={()=> setSendButtonHover(false)}
      >
        SEND {sendButtonHover ? <Send/> : null}
      </button>
    </div>
  )
}

export default SendMessageModal
