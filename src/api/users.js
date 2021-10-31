const USERS_KEY = 'otd-users'

const fetchUsers = () => JSON.parse(localStorage.getItem(USERS_KEY))

const storeUsers = (users) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users))

export { fetchUsers, storeUsers }
