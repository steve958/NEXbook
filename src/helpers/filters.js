export function filterUser(name, allUsers) {
  return allUsers.find((user) => user.userName === name)
}
