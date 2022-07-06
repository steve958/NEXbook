export function loginUser(userName, password) {
  return fetch('http://localhost:3090/subscribers/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      userName,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
}

export function registerUser(
  firstName,
  lastName,
  avatar,
  age,
  profession,
  userName,
  password,
) {
  return fetch('http://localhost:3090/subscribers/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      avatar,
      age,
      profession,
      userName,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
}

export function fetchAllUsers() {
  return fetch(`http://localhost:3090/subscribers`)
    .then((res) => res.json())
    .then((data) => data)
}

export function onlyLoggedUser(id) {
  return fetch(`http://localhost:3090/subscribers/${id}`)
    .then((res) => res.json())
    .then((data) => data)
}

export function editUser(id, payload) {
  return fetch(`http://localhost:3090/subscribers/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data)
}

export function deleteMessage(userId, payload) {
  return fetch(`http://localhost:3090/subscribers/inbox/${userId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data)
}

export function deleteMessageFromOutbox(userId, payload) {
  return fetch(`http://localhost:3090/subscribers/outbox/${userId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data)
}

export function markMessageAsSeen(id, payload) {
  return fetch(`http://localhost:3090/subscribers/inbox/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data)
}

export function toggleFeedsPrivacy(id, payload) {
  return fetch(`http://localhost:3090/subscribers/feeds/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data)
}

export function deleteFeed(userId, payload) {
  return fetch(`http://localhost:3090/subscribers/feeds/${userId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data)
}

export function likeFeed(userId, payload) {
  return fetch(`http://localhost:3090/subscribers/like/${userId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data)
}

export function unlikeFeed(userId, payload) {
  return fetch(`http://localhost:3090/subscribers/unlike/${userId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data)
}

export function notificationsSeen(userId) {
  return fetch(`http://localhost:3090/subscribers/notifications/${userId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data)
}

export function clearAllNotifications(userId) {
  return fetch(`http://localhost:3090/subscribers/notifications/${userId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data)
}
