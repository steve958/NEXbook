import React, { useState } from 'react'
import './LatestFeeds.css'
import { ThumbUpRounded } from '@mui/icons-material'
import { FeedType } from '../helpers/types'
import { filterLikes, filterUserById } from '../helpers/filters'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  likeFeed,
  unlikeFeed,
  fetchAllUsers,
  onlyLoggedUser,
} from '../helpers/ApiCalls'
import { setInitialUsersdata, setLoggedUsersData } from '../features/user-slice'

interface LatestFeedsProps {
  allFeedsFromUsers: {
    userID: string
    feeds: FeedType[]
  }[]
  searchQuery: string
}

const LatestFeeds: React.FC<LatestFeedsProps> = (props) => {
  const [likeCliked, setLikeClicked] = useState<boolean>(false)
  const [likeAvatarsClicked, setLikeAvatarsClicked] = useState<string>('')
  let allUsers = useAppSelector((state) => state.user.allUsersData)
  let loggedUser = useAppSelector((state) => state.user.loggedUser)
  const dispatch = useAppDispatch()
  async function handleLike(
    userId: string,
    feedId: string,
    loggedUserId: string,
    feed: FeedType,
  ) {
    if (filterLikes(loggedUserId, feed)) {
      const payload = {
        feedId,
        userID: loggedUserId,
      }
      console.log(payload)
      const response = await unlikeFeed(userId, payload)
      console.log(response)
      const data = await fetchAllUsers()
      dispatch(setInitialUsersdata(data))
    } else {
      const payload = {
        feedId,
        userID: loggedUserId,
      }
      console.log(payload)
      const response = await likeFeed(userId, payload)
      console.log(response)
      const data = await fetchAllUsers()
      dispatch(setInitialUsersdata(data))
      const userData = await onlyLoggedUser(loggedUserId)
      dispatch(setLoggedUsersData(userData))
    }
  }

  function handleLikesAvatars(likes: string) {
    if (likeAvatarsClicked.includes(likes)) {
      setLikeAvatarsClicked('')
    } else {
      setLikeAvatarsClicked(likes)
    }
  }

  function showFeedsFiltered() {
    return props.allFeedsFromUsers
      .filter(
        (feed: any) =>
          feed.feedContent.includes(props.searchQuery) ||
          feed._id.includes(props.searchQuery),
      )
      .map((feed: any) => {
        return (
          <div id="users-feed" key={feed._id}>
            <img
              className="users-feed-user-avatar"
              src={filterUserById(feed.userID, allUsers).avatar}
              alt="photo"
            />
            <div id="users-feed-wrapper">
              <h1 id="users-feed-user-name">
                {filterUserById(feed.userID, allUsers).firstName}{' '}
                {filterUserById(feed.userID, allUsers).lastName}
              </h1>
              <p>{feed.feedDate.toString().slice(0, 10)}</p>
            </div>
            <div id="users-feed-content">{feed.feedContent}</div>
            <span
              id={
                filterLikes(loggedUser!._id, feed)
                  ? 'like-clicked'
                  : 'like-button'
              }
            >
              <span
                onClick={() =>
                  handleLike(feed.userID, feed._id, loggedUser!._id, feed)
                }
              >
                {filterLikes(loggedUser!._id, feed) ? 'Remove like' : 'Like'}
              </span>
              <ThumbUpRounded />
              <span onClick={() => handleLikesAvatars(feed._id)}>
                {feed.feedLikes.length}
              </span>
            </span>
            {feed._id === likeAvatarsClicked ? (
              <div id="likes-avatars-show">
                {feed.feedLikes.map((like: string) => {
                  return (
                    <img
                      id="likes-avatars-show-img"
                      key={like}
                      src={filterUserById(like, allUsers).avatar}
                      alt="photo"
                    />
                  )
                })}
              </div>
            ) : null}
          </div>
        )
      })
      .slice(0, 10)
  }

  function showFeeds() {
    return props.allFeedsFromUsers
      .map((feed: any) => {
        return (
          <div id="users-feed" key={feed._id}>
            <img
              className="users-feed-user-avatar"
              src={filterUserById(feed.userID, allUsers).avatar}
              alt="photo"
            />
            <div id="users-feed-wrapper">
              <h1 id="users-feed-user-name">
                {filterUserById(feed.userID, allUsers).firstName}{' '}
                {filterUserById(feed.userID, allUsers).lastName}
              </h1>
              <p>{feed.feedDate.toString().slice(0, 10)}</p>
            </div>
            <div id="users-feed-content">{feed.feedContent}</div>
            <span
              id={
                filterLikes(loggedUser!._id, feed)
                  ? 'like-clicked'
                  : 'like-button'
              }
            >
              <span
                onClick={() =>
                  handleLike(feed.userID, feed._id, loggedUser!._id, feed)
                }
              >
                {filterLikes(loggedUser!._id, feed) ? 'Remove like' : 'Like'}
              </span>
              <ThumbUpRounded />
              <span onClick={() => handleLikesAvatars(feed._id)}>
                {feed.feedLikes.length}
              </span>
            </span>
            {feed._id === likeAvatarsClicked ? (
              <div id="likes-avatars-show">
                {feed.feedLikes.map((like: string) => {
                  return (
                    <img
                      id="likes-avatars-show-img"
                      key={like}
                      src={filterUserById(like, allUsers).avatar}
                      alt="photo"
                    />
                  )
                })}
              </div>
            ) : null}
          </div>
        )
      })
      .slice(0, 10)
  }

  return (
    <>
      {props.searchQuery
        ? props.allFeedsFromUsers && showFeedsFiltered()
        : props.allFeedsFromUsers && showFeeds()}
    </>
  )
}

export default LatestFeeds
