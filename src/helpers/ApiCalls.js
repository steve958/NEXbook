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
