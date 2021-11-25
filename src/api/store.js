export const STORE_KEYS = {
  users: 'otd-users',
  date: 'otd-date',
}

export const set = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value))

export const get = (key) => JSON.parse(localStorage.getItem(key))

const store = { get, set, STORE_KEYS }
export default store
