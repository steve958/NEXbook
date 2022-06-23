import React, { useRef, useState } from 'react'
import './Feed.css'
import {
  DeleteForever,
  Public,
  PublicOff,
  FeedRounded,
  ThumbUpRounded,
} from '@mui/icons-material'
import LatestFeeds from './LatestFeeds'

const Feed: React.FC = () => {
  const feedContent = useRef<HTMLInputElement>(null)
  const [feed, setFeed] = useState<any>([])
  const [privateFeeds, setPrivateFeeds] = useState<number[]>([])
  const [maxCharactersError, setMaxCharactersError] = useState<boolean>(false)
  const [deleteFeedId, setDeleteFeedId] = useState<string>('')
  const [
    showOnlyPrivateFeedsClicked,
    setShowOnlyPrivateFeedsClicked,
  ] = useState<boolean>(true)

  const [showOnlyPublicFeedsClicked, setShowOnlyPublicFeedsClicked] = useState<
    boolean
  >(false)

  function postFeed() {
    const enteredText = feedContent.current!.value
    if (enteredText.length > 40) {
      setMaxCharactersError(true)
      feedContent.current!.value = ''
      setTimeout(() => setMaxCharactersError(false), 3000)
    } else if (enteredText.length > 0) {
      setFeed((oldState: any) => [...oldState, enteredText])
      feedContent.current!.value = ''
      setMaxCharactersError(false)
    }
  }

  function handlePublicClick(id: number) {
    privateFeeds.includes(id)
      ? setPrivateFeeds((oldState) => [
          ...oldState.filter((state) => state !== id),
        ])
      : setPrivateFeeds((oldState) => [...oldState, id])
  }

  function handleDeleteClick(id: string) {
    setDeleteFeedId(id)
    setTimeout(
      () =>
        setFeed((oldState: any) => [
          ...oldState.filter((state: string) => state !== id),
        ]),
      2000,
    )
  }

  function usersFeedsOnly() {
    return feed[0] ? (
      feed.map((feed: string, index: number) => {
        return (
          <div id={feed === deleteFeedId ? 'fade-out' : 'empty'}>
            <div
              id={privateFeeds.includes(index) ? 'private-feed' : 'feed'}
              key={index}
            >
              <p
                className="feed-content"
                id={feed === deleteFeedId ? 'fade-content' : 'empty'}
              >
                {feed}
              </p>
              <div className="feed-icons-wrapper">
                <span
                  className="feed-icon-delete"
                  onClick={(e) => handleDeleteClick(feed)}
                >
                  <DeleteForever />
                </span>
                <span
                  className="feed-icon-private"
                  onClick={() => handlePublicClick(index)}
                >
                  {privateFeeds.includes(index) ? <PublicOff /> : <Public />}
                </span>
              </div>
              <p id="feed-date">{new Date().toString().slice(0, 10)}</p>
              {privateFeeds.includes(index) ? (
                <p>private feed</p>
              ) : (
                <p>public feed</p>
              )}
              <span id="like-button-user">
                <ThumbUpRounded />
                <p>0</p>
              </span>
            </div>
          </div>
        )
      })
    ) : (
      <p id="zero-feeds-text">--- you don't have any feeds ---</p>
    )
  }

  return (
    <div id="feed-container">
      <div id="post-container">
        <h1>What's on your mind, Steve?</h1>
        <input id="status-input" type="text" ref={feedContent} />
        {maxCharactersError ? (
          <p id="characters-error">Maximum number of characters exceeded</p>
        ) : null}
        <div id="feed-wrapper">
          <span
            id="feed-icons-personal-feed"
            className={showOnlyPrivateFeedsClicked ? 'active' : 'inactive'}
            onClick={() => {
              setShowOnlyPrivateFeedsClicked(true)
              setShowOnlyPublicFeedsClicked(false)
            }}
          >
            <FeedRounded />
            <p>show only your feeds</p>
          </span>
          <span
            id="feed-icons-public-feeds"
            className={showOnlyPublicFeedsClicked ? 'active' : 'inactive'}
            onClick={() => {
              setShowOnlyPrivateFeedsClicked(false)
              setShowOnlyPublicFeedsClicked(true)
            }}
          >
            <img src="https://freesvg.org/img/1312903882.png" alt="" />
            <p>show latest feeds from all users</p>
          </span>
          <button id="post-button" onClick={postFeed}>
            POST
          </button>
        </div>
      </div>
      <div id="feed-list">
        {showOnlyPublicFeedsClicked ? (
          <LatestFeeds userFeeds={feed} />
        ) : (
          usersFeedsOnly()
        )}
      </div>
    </div>
  )
}

export default Feed
