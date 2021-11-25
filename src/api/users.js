import { set, get, STORE_KEYS } from '.'

const getUsers = () => get(STORE_KEYS.users)

const setUsers = (users) => set(STORE_KEYS.users, users)

export { getUsers, setUsers }
