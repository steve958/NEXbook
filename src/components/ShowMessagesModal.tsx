import React from 'react'
import './ShowMessagesModal.css'
import { Close } from '@mui/icons-material'

interface ShowMessagesModalProps {
  setShowMessagesClicked: Function
}

const ShowMessagesModal: React.FC<ShowMessagesModalProps> = (props) => {
  return (
    <div id="show-messages-modal">
      <div id="show-messages-wrapper">
        <span
          id="close-modal-icon"
          onClick={() => props.setShowMessagesClicked(false)}
        >
          <Close />
        </span>
        <h1 id="header">MESSAGES</h1>
        <div id="message-wrapper">
          <h1>from</h1>
          <h1>USER 1</h1>
          <p id="message-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ex
            deleniti quam, sunt perspiciatis aliquam corporis et, aspernatur vel
            dolores doloremque ipsum, error inventore laudantium sint quaerat
            assumenda quas voluptatibus.
          </p>
        </div>
        <div id="message-wrapper">
          <h1>from</h1>
          <h1>USER 1</h1>
          <p id="message-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ex
            deleniti quam, sunt perspiciatis aliquam corporis et, aspernatur vel
            dolores doloremque ipsum, error inventore laudantium sint quaerat
            assumenda quas voluptatibus.
          </p>
        </div>
        <div id="message-wrapper">
          <h1>from</h1>
          <h1>USER 1</h1>
          <p id="message-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ex
            deleniti quam, sunt perspiciatis aliquam corporis et, aspernatur vel
            dolores doloremque ipsum, error inventore laudantium sint quaerat
            assumenda quas voluptatibus.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShowMessagesModal
