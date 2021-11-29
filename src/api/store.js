import { STORE_KEYS } from '../constants'

const set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

const get = (key) => JSON.parse(localStorage.getItem(key))

export { get, set, STORE_KEYS }
