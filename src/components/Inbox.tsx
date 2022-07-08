import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { filterUser } from '../helpers/filters'
import { Message } from '../helpers/types'
import {
  deleteMessage,
  markMessageAsSeen,
  onlyLoggedUser,
} from '../helpers/ApiCalls'
import { setLoggedUsersData } from '../features/user-slice'

interface InboxProps {}

const Inbox: React.FC<InboxProps> = (props) => {
  let allUsers = useAppSelector((state) => state.user.allUsersData)
  const loggedUser = useAppSelector((state) => state.user.loggedUser)
  const dispatch = useAppDispatch()
  async function handleDelete(userId: string, messageId: string) {
    const payload = {
      deletedId: messageId,
    }
    const response = await deleteMessage(userId, payload)
    const userData = await onlyLoggedUser(loggedUser!._id)
    dispatch(setLoggedUsersData(userData))
  }

  async function handleSeen(message: Message) {
    const payload = {
      messageId: message._id,
      inbox: {
        ...message,
        messageSeen: true,
      },
    }

    const response = await markMessageAsSeen(loggedUser!._id, payload)
    const userData = await onlyLoggedUser(loggedUser!._id)
    dispatch(setLoggedUsersData(userData))
  }

  return (
    <>
      <h1 id="header">INBOX</h1>
      {loggedUser!.inbox.length !== 0 ? (
        loggedUser!.inbox.map((message: Message) => {
          return (
            <div
              id={
                message.messageSeen === false
                  ? 'message-wrapper'
                  : 'message-wrapper-seen'
              }
              key={message._id}
            >
              <span>
                <p>{message.messageDate?.toString().slice(0, 10)}</p>
                <div
                  id={
                    message.messageSeen === false
                      ? 'delete-message'
                      : 'delete-message-seen'
                  }
                  onClick={() => handleDelete(loggedUser!._id, message._id)}
                >
                  delete message
                </div>
                <div
                  onClick={() => handleSeen(message)}
                  id={
                    message.messageSeen === false
                      ? 'mark-as-read'
                      : 'mark-as-read-seen'
                  }
                >
                  {message.messageSeen === false ? 'mark as read' : 'seen'}
                </div>
              </span>
              <img
                src={filterUser(message.messageFrom, allUsers).avatar}
                alt="photo"
                className="sender-avatar"
              />
              <h1>
                {filterUser(message.messageFrom, allUsers).firstName}{' '}
                {filterUser(message.messageFrom, allUsers).lastName}
              </h1>
              <p
                id={
                  message.messageSeen === false
                    ? 'message-content'
                    : 'message-content-seen'
                }
              >
                {message.messageContent}
              </p>
            </div>
          )
        })
      ) : (
        <p id="blank">--- NO MESSAGES ---</p>
      )}
    </>
  )
}

export default Inbox
