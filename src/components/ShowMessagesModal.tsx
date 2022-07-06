import React, { useState } from 'react'
import './ShowMessagesModal.css'
import { Close } from '@mui/icons-material'
import Inbox from './Inbox'
import SentMessages from './SentMessages'

interface ShowMessagesModalProps {
  setShowMessagesClicked: Function
}

const ShowMessagesModal: React.FC<ShowMessagesModalProps> = (props) => {
  const [sentMessagesClicked, setSendMessagesClicked] = useState<boolean>(false)

  return (
    <div id="show-messages-modal">
      <div id="show-messages-wrapper">
        <span
          id="close-modal-icon"
          onClick={() => props.setShowMessagesClicked(false)}
        >
          <Close />
        </span>
        <span id="show-messages-icons-wrapper">
          <div
            id={sentMessagesClicked ? 'inbox-icon' : 'active-icon'}
            onClick={() => setSendMessagesClicked(false)}
          >
            inbox
          </div>
          <div
            id={!sentMessagesClicked ? 'sent-messages-icon' : 'active-icon'}
            onClick={() => setSendMessagesClicked(true)}
          >
            sent messages
          </div>
        </span>
        <div id="scrolling-wrapper">
          {sentMessagesClicked ? <SentMessages /> : <Inbox />}
        </div>
      </div>
    </div>
  )
}

export default ShowMessagesModal
