import { set, get } from '.'
import { STORE_KEYS } from '../constants'

const makeToday = () => {
  const now = new Date()
  const m = now.getMonth()
  const d = now.getDate()
  const y = now.getFullYear()
  return `${m}${d}${y}`
}

const getToday = () => get(STORE_KEYS.today)

const setToday = () => set(STORE_KEYS.today, makeToday())

export { getToday, makeToday, setToday }
