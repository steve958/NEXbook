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
  onlyLoggedUser,
} from '../helpers/ApiCalls'
import { FeedType, User } from '../helpers/types'
import { filterFeeds, filterUser } from '../helpers/filters'
import { setInitialUsersdata, setLoggedUsersData } from '../features/user-slice'

interface FeedsProps {
  setChanges: Function
  changes: boolean
  searchQuery: string
  showOnlyPrivateFeedsClicked: boolean
  setShowOnlyPrivateFeedsClicked: Function
  showOnlyPublicFeedsClicked: boolean
  setShowOnlyPublicFeedsClicked: Function
}

const Feed: React.FC<FeedsProps> = (props) => {
  const feedContent = useRef<HTMLInputElement>(null)
  const [confirmationModal, setConfirmationModal] = useState<string>('')
  const [allFeedsFromUsers, setAllFeedsFromUsers] = useState<any>([])
  const [maxCharactersError, setMaxCharactersError] = useState<boolean>(false)
  const [deleteFeedId, setDeleteFeedId] = useState<string>('')
  const [successfulPost, setSuccessfulPost] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  let loggedUser = useAppSelector((state) => state.user.loggedUser)
  let allUsers = useAppSelector((state) => state.user.allUsersData)
  useEffect(() => {
    if (loggedUser) {
      setAllFeedsFromUsers(filterFeeds(allUsers))
    }
  }, [loggedUser, allUsers])

  async function postFeed() {
    const enteredText = feedContent.current!.value
    if (enteredText.length > 50) {
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
      const data = await fetchAllUsers()
      dispatch(setInitialUsersdata(data))
      dispatch(setLoggedUsersData(filterUser(loggedUser!.userName, data)))
      feedContent.current!.value = ''
      setMaxCharactersError(false)
      setSuccessfulPost(true)
      setTimeout(() => setSuccessfulPost(false), 4000)
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
    const userData = await onlyLoggedUser(loggedUser?._id)

    setTimeout(() => {
      props.setChanges(!props.changes)
      if (userData._id) {
        dispatch(setLoggedUsersData(userData))
      }
    }, 1500)

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
            className={
              props.showOnlyPrivateFeedsClicked ? 'active' : 'inactive'
            }
            onClick={() => {
              props.setShowOnlyPrivateFeedsClicked(true)
              props.setShowOnlyPublicFeedsClicked(false)
            }}
          >
            <FeedRounded />
            <p>show only your feeds</p>
          </span>
          <span
            id="feed-icons-public-feeds"
            className={props.showOnlyPublicFeedsClicked ? 'active' : 'inactive'}
            onClick={() => {
              props.setShowOnlyPrivateFeedsClicked(false)
              props.setShowOnlyPublicFeedsClicked(true)
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
        {successfulPost && (
          <div id="successful-post">
            <p>Nice job, {loggedUser!.firstName}</p>
            <span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Check-Logo.png"
                alt="photo"
              />
            </span>
            <p>You posted on NEXBOOK</p>
          </div>
        )}
        {props.showOnlyPublicFeedsClicked ? (
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
