import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { deleteMessageFromOutbox, onlyLoggedUser } from '../helpers/ApiCalls'
import { filterUser } from '../helpers/filters'
import { OutboxMessage } from '../helpers/types'
import { setLoggedUsersData } from '../features/user-slice'

interface SentMessagesProps {}

const SentMessages: React.FC<SentMessagesProps> = (props) => {
  let loggedUser = useAppSelector((state) => state.user.loggedUser)
  let allUsers = useAppSelector((state) => state.user.allUsersData)
  const dispatch = useAppDispatch()

  async function handleDelete(userId: string, messageId: string) {
    const payload = {
      deletedId: messageId,
    }
    const response = await deleteMessageFromOutbox(userId, payload)
    const userData = await onlyLoggedUser(loggedUser!._id)
    dispatch(setLoggedUsersData(userData))
  }

  return (
    <>
      <h1 id="header">SENT MESSAGES</h1>
      {loggedUser!.outbox.length !== 0 ? (
        loggedUser!.outbox.map((message: OutboxMessage) => {
          return (
            <div id="message-wrapper" key={message._id}>
              <span>
                <p>{message.messageDate?.toString().slice(0, 10)}</p>
                <p
                  id="delete-message-outbox"
                  onClick={() => handleDelete(loggedUser!._id, message._id)}
                >
                  delete message
                </p>
              </span>
              <img
                src={filterUser(message.messageTo, allUsers).avatar}
                alt="photo"
                className="sender-avatar"
              />
              <h1>
                {filterUser(message.messageTo, allUsers).firstName}{' '}
                {filterUser(message.messageTo, allUsers).lastName}
              </h1>
              <p id="message-content">{message.messageContent}</p>
            </div>
          )
        })
      ) : (
        <p id="blank">--- NO MESSAGES --- </p>
      )}
    </>
  )
}

export default SentMessages
