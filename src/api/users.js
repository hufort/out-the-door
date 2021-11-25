import { set, get } from '.'
import { STORE_KEYS } from '../constants'

const getUsers = () => get(STORE_KEYS.users)

const setUsers = (users) => set(STORE_KEYS.users, users)

export { getUsers, setUsers }
