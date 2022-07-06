import React, { useRef, useState } from 'react'
import './SendMessageModal.css'
import { Close, Send } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { editUser, onlyLoggedUser } from '../helpers/ApiCalls'
import { patchHelper } from '../helpers/patchHelper'
import { setLoggedUsersData } from '../features/user-slice'
import { filterUserById } from '../helpers/filters'

interface SendMessageProps {
  setSendMessageClicked: Function
  senderInformation: { id: string; avatar: string; firstName: string } | null
}

const SendMessageModal: React.FC<SendMessageProps> = (props) => {
  const [sendButtonHover, setSendButtonHover] = useState<boolean>(false)
  const enteredMessage = useRef<HTMLTextAreaElement>(null)
  const loggedUserName = useAppSelector((state) => state.user.loggedIn)
  const loggedUser = useAppSelector((state) => state.user.loggedUser)
  const allUsers = useAppSelector((state) => state.user.allUsersData)
  const dispatch = useAppDispatch()
  async function handleMessageSending(id: string) {
    props.setSendMessageClicked(false)
    const inbox = {
      messageContent: enteredMessage.current!.value,
      messageFrom: loggedUserName,
      messageSeen: false,
      messageDate: new Date(),
    }
    const outbox = {
      messageContent: enteredMessage.current!.value,
      messageTo: filterUserById(id, allUsers).userName,
      messageDate: new Date(),
    }
    const payloadReceiver = { ...patchHelper(), inbox }
    console.log(payloadReceiver)
    const payloadSender = { ...patchHelper(), outbox }
    const receiver = await editUser(id, payloadReceiver)
    console.log(receiver)
    const sender = await editUser(loggedUser!._id, payloadSender)
    console.log(sender)
    const userData = await onlyLoggedUser(loggedUser!._id)
    dispatch(setLoggedUsersData(userData))
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
