export function filterUser(name, allUsers) {
  return allUsers.find((user) => user.userName === name)
}

export function filterUserById(id, allUsers) {
  return allUsers.find((user) => user._id === id)
}

export function filterMessages(user) {
  return user.inbox
}

export function filterFeeds(allUsers) {
  let allFeeds = []
  allUsers?.forEach((user) => {
    allFeeds.push(
      ...user.feeds
        .map((feed) => {
          return { ...feed, userID: user._id }
        })
        .filter((feed) => feed.private === false),
    )
  })
  return allFeeds.sort((a, b) => new Date(b.feedDate) - new Date(a.feedDate))
}

export function filterUnseenMessagesCount(inbox) {
  let count = 0
  if (inbox) {
    inbox.forEach((message) => {
      if (message.messageSeen === false) count++
    })
  }

  return count
}

export function filterUnseenNotifications(notifications) {
  let count = 0
  if (notifications !== null && notifications?.length > 0) {
    notifications.forEach((action) => {
      if (action?.actionSeen === false) count++
    })
  }

  return count
}

export function filterLikes(userId, feed) {
  if (feed.feedLikes.includes(userId)) return true
  return false
}

export function filterFeedsById(feedId, feed) {
  if (feed && feedId) {
    return feed.find((feed) => feed._id === feedId)?.feedContent
  }
  return null
}
