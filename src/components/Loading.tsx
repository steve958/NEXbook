import React from 'react'
import './Loading.css'

const Loading: React.FC = () => {
  return (
    <div id='loading-wrapper'>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
