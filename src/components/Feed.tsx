import React, { useEffect, useRef, useState } from 'react'
import './Feed.css'
import {
  DeleteForever,
  Public,
  PublicOff,
  FeedRounded,
  ThumbUpRounded,
} from '@mui/icons-material'
import LatestFeeds from './LatestFeeds'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { patchHelper } from '../helpers/patchHelper'
import {
  deleteFeed,
  editUser,
  toggleFeedsPrivacy,
  fetchAllUsers,
} from '../helpers/ApiCalls'
import { FeedType, User } from '../helpers/types'
import { filterFeeds, filterUser } from '../helpers/filters'
import { setInitialUsersdata, setLoggedUsersData } from '../features/user-slice'

interface FeedsProps {
  setChanges: Function
  changes: boolean
  searchQuery: string
}

const Feed: React.FC<FeedsProps> = (props) => {
  const feedContent = useRef<HTMLInputElement>(null)
  const [confirmationModal, setConfirmationModal] = useState<string>('')
  const [allFeedsFromUsers, setAllFeedsFromUsers] = useState<any>([])
  const [maxCharactersError, setMaxCharactersError] = useState<boolean>(false)
  const [deleteFeedId, setDeleteFeedId] = useState<string>('')
  const [
    showOnlyPrivateFeedsClicked,
    setShowOnlyPrivateFeedsClicked,
  ] = useState<boolean>(true)

  const [showOnlyPublicFeedsClicked, setShowOnlyPublicFeedsClicked] = useState<
    boolean
  >(false)
  const dispatch = useAppDispatch()
  let loggedUser = useAppSelector((state) => state.user.loggedUser)
  let allUsers = useAppSelector((state) => state.user.allUsersData)
  useEffect(() => {
    if (loggedUser) {
      console.log(loggedUser!.feeds)
      setAllFeedsFromUsers(filterFeeds(allUsers))
      console.log(allFeedsFromUsers)
    }
  }, [loggedUser, allUsers])

  async function postFeed() {
    const enteredText = feedContent.current!.value
    if (enteredText.length > 40) {
      setMaxCharactersError(true)
      feedContent.current!.value = ''
      setTimeout(() => setMaxCharactersError(false), 3000)
    } else if (enteredText.length > 0) {
      const feeds = {
        feedContent: enteredText,
        feedDate: new Date(),
        feedLikes: [],
        private: false,
      }
      const payload = { ...patchHelper(), feeds }
      const response = await editUser(loggedUser?._id, payload)
      console.log(response)
      const data = await fetchAllUsers()
      dispatch(setInitialUsersdata(data))
      dispatch(setLoggedUsersData(filterUser(loggedUser!.userName, data)))
      feedContent.current!.value = ''
      setMaxCharactersError(false)
    }
  }

  async function handlePublicClick(feed: FeedType) {
    const payload = {
      feedId: feed._id,
      feeds: {
        ...feed,
        private: !feed.private,
      },
    }
    const response = await toggleFeedsPrivacy(loggedUser!._id, payload)
    console.log(response)
    const data = await fetchAllUsers()
    dispatch(setInitialUsersdata(data))
    dispatch(setLoggedUsersData(filterUser(loggedUser!.userName, data)))
  }

  async function handleDeleteClick(id: string) {
    setDeleteFeedId(id)

    const payload = {
      deletedId: id,
    }
    const response = await deleteFeed(loggedUser!._id, payload)
    setTimeout(() => {
      props.setChanges(!props.changes)
    }, 1500)
    console.log(response)
    setConfirmationModal('')
  }

  function usersFeedsOnly() {
    return loggedUser ? (
      loggedUser.feeds.map((feed: FeedType) => {
        return (
          <div
            id={feed._id === deleteFeedId ? 'fade-out' : 'empty'}
            key={feed._id}
          >
            <div id={feed.private === true ? 'private-feed' : 'feed'}>
              <p
                className="feed-content"
                id={feed._id === deleteFeedId ? 'fade-content' : 'empty'}
              >
                {feed.feedContent}
              </p>
              <div className="feed-icons-wrapper">
                <span
                  className="feed-icon-delete"
                  onClick={(e) => setConfirmationModal(feed._id)}
                >
                  <DeleteForever />
                </span>
                <span
                  className="feed-icon-private"
                  onClick={() => handlePublicClick(feed)}
                >
                  {feed.private === true ? <PublicOff /> : <Public />}
                </span>
              </div>
              <p id="feed-date">{feed.feedDate.toString().slice(0, 10)}</p>
              {feed.private === true ? <p>private feed</p> : <p>public feed</p>}
              <span id="like-button-user">
                <ThumbUpRounded />
                <p>{feed.feedLikes.length}</p>
              </span>
            </div>
            {confirmationModal && (
              <div id="confirmation-modal">
                <h1>Are you sure you want to delete this feed?</h1>
                <span id="confirmation-modal-img-wrapper">
                  <img
                    src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131__340.png"
                    alt=""
                  />
                </span>
                <div id="confirmation-modal-wrapper">
                  <button
                    id="yes-button"
                    onClick={() => handleDeleteClick(confirmationModal)}
                  >
                    YES
                  </button>
                  <button
                    id="cancel-button"
                    onClick={() => setConfirmationModal('')}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })
    ) : (
      <p id="zero-feeds-text">--- you don't have any feeds ---</p>
    )
  }

  function usersFeedsOnlyFiltered() {
    return loggedUser ? (
      loggedUser.feeds
        .filter((feed: FeedType) =>
          feed.feedContent.includes(props.searchQuery),
        )
        .map((feed: FeedType, index: number) => {
          return (
            <div
              id={feed._id === deleteFeedId ? 'fade-out' : 'empty'}
              key={feed._id}
            >
              <div id={feed.private === true ? 'private-feed' : 'feed'}>
                <p
                  className="feed-content"
                  id={feed._id === deleteFeedId ? 'fade-content' : 'empty'}
                >
                  {feed.feedContent}
                </p>
                <div className="feed-icons-wrapper">
                  <span
                    className="feed-icon-delete"
                    onClick={(e) => handleDeleteClick(feed._id)}
                  >
                    <DeleteForever />
                  </span>
                  <span
                    className="feed-icon-private"
                    onClick={() => handlePublicClick(feed)}
                  >
                    {feed.private === true ? <PublicOff /> : <Public />}
                  </span>
                </div>
                <p id="feed-date">{feed.feedDate.toString().slice(0, 10)}</p>
                {feed.private === true ? (
                  <p>private feed</p>
                ) : (
                  <p>public feed</p>
                )}
                <span id="like-button-user">
                  <ThumbUpRounded />
                  <p>{feed.feedLikes.length}</p>
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
        <h1>
          What's on your mind, {loggedUser ? loggedUser!.firstName : null}
        </h1>
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
          <LatestFeeds
            allFeedsFromUsers={allFeedsFromUsers}
            searchQuery={props.searchQuery}
          />
        ) : props.searchQuery ? (
          usersFeedsOnlyFiltered()
        ) : (
          usersFeedsOnly()
        )}
      </div>
    </div>
  )
}

export default Feed
