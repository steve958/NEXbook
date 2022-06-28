import React, { useRef, useState } from 'react'
import './SendMessageModal.css'
import { Close, Send } from '@mui/icons-material'
import { useAppSelector } from '../app/hooks'
import { editUser } from '../helpers/ApiCalls'
import { patchHelper } from '../helpers/patchHelper'

interface SendMessageProps {
  setSendMessageClicked: Function
  senderInformation: { id: string; avatar: string; firstName: string } | null
}

const SendMessageModal: React.FC<SendMessageProps> = (props) => {
  const [sendButtonHover, setSendButtonHover] = useState<boolean>(false)
  const enteredMessage = useRef<HTMLTextAreaElement>(null)
  const loggedUserName = useAppSelector((state) => state.user.loggedIn)

  function handleMessageSending(id: string) {
    props.setSendMessageClicked(false)
    const inbox = {
      messageContent: enteredMessage.current!.value,
      messageFrom: loggedUserName,
      messageSeen: false,
      messageTime: new Date(),
    }
    const payload = { ...patchHelper(), inbox }
    console.log(payload)
    const data = editUser(id, payload)
    console.log(data)
  }

  return (
    <div id="send-message-modal">
      <div id="send-message-wrapper">
        <span
          id="close-modal-icon"
          onClick={() => props.setSendMessageClicked(false)}
        >
          <Close />
        </span>
        <h1>Send a message to </h1>
        <img
          className="send-message-user-avatar"
          src={props.senderInformation?.avatar}
          alt=""
        />
      </div>
      <textarea
        id="send-message-text-area"
        placeholder={`Hello ${props.senderInformation?.firstName}...`}
        ref={enteredMessage}
      ></textarea>
      <button
        id="send-button"
        onClick={() => handleMessageSending(props.senderInformation!.id)}
        onMouseEnter={() => setSendButtonHover(true)}
        onMouseLeave={() => setSendButtonHover(false)}
      >
        SEND {sendButtonHover ? <Send /> : null}
      </button>
    </div>
  )
}

export default SendMessageModal
