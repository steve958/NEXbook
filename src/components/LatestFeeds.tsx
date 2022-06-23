import React, { useState } from 'react'
import './LatestFeeds.css'
import { ThumbUpRounded } from '@mui/icons-material'

interface LatestFeedsProps {
  userFeeds: any[]
}

const LatestFeeds: React.FC<LatestFeedsProps> = (props) => {
  const [likeCliked, setLikeClicked] = useState<boolean>(false)

  return (
    <>
      <div id="users-feed">
        <img
          className="users-feed-user-avatar"
          src="https://freesvg.org/img/1459344336.png"
          alt="photo"
        />
        <div id="users-feed-wrapper">
          <h1 id="users-feed-user-name">User 1</h1>
          <p>{new Date().toString().slice(0, 10)}</p>
        </div>
        <div id="users-feed-content">
          alksdjlaksjdlkasjdlkajsdkljaklsdjlakjsl
        </div>
        <span
          id="like-button"
          className={likeCliked ? 'like-clicked' : 'empty'}
        >
          <span onClick={() => setLikeClicked(!likeCliked)}>Like</span>
          <ThumbUpRounded />
          <span>{likeCliked ? 1 : 0}</span>
        </span>
      </div>
      <div id="users-feed">
        <img
          className="users-feed-user-avatar"
          src="https://freesvg.org/img/1459344336.png"
          alt="photo"
        />
        <div id="users-feed-wrapper">
          <h1 id="users-feed-user-name">User 1</h1>
          <p>{new Date().toString().slice(0, 10)}</p>
        </div>
        <div id="users-feed-content">alksdjlaksjdlkasjdlkajsassdgsdgl</div>
        <span id="like-button">
          <span>Like</span>
          <ThumbUpRounded />
          <span>0</span>
        </span>
      </div>
      <div id="users-feed">
        <img
          className="users-feed-user-avatar"
          src="https://freesvg.org/img/1459344336.png"
          alt="photo"
        />
        <div id="users-feed-wrapper">
          <h1 id="users-feed-user-name">User 1</h1>
          <p>{new Date().toString().slice(0, 10)}</p>
        </div>
        <div id="users-feed-content">asdasdasdasd</div>
        <span id="like-button">
          <span>Like</span>
          <ThumbUpRounded />
          <span>0</span>
        </span>
      </div>
      <div id="users-feed">
        <img
          className="users-feed-user-avatar"
          src="https://freesvg.org/img/1459344336.png"
          alt="photo"
        />
        <div id="users-feed-wrapper">
          <h1 id="users-feed-user-name">User 1</h1>
          <p>{new Date().toString().slice(0, 10)}</p>
        </div>
        <div id="users-feed-content">asdasdasdasdasd</div>
        <span id="like-button">
          <span>Like</span>
          <ThumbUpRounded />
          <span>0</span>
        </span>
      </div>
      {props.userFeeds &&
        props.userFeeds.map((uFeed: any) => {
          return (
            <div id="users-feed">
              <img
                className="users-feed-user-avatar"
                src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105561/126045782-vector-illustration-of-avatar-and-dummy-sign-collection-of-avatar-and-image-stock-symbol-for-web-.jpg"
                alt="photo"
              />
              <div id="users-feed-wrapper">
                <h1 id="users-feed-user-name">Steve Nex</h1>
                <p>{new Date().toString().slice(0, 10)}</p>
              </div>
              <div id="users-feed-content">{uFeed}</div>
              <span id="like-button">
                <span>Like</span>
                <ThumbUpRounded />
                <span>0</span>
              </span>
            </div>
          )
        })}
    </>
  )
}

export default LatestFeeds
