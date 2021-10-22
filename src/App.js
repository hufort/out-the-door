import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { Button, Dropdown, Grid, Stack } from './components'
import _ from 'lodash'

const makeDate = () => {
  const now = new Date()
  const m = now.getMonth()
  const d = now.getDate()
  const y = now.getFullYear()
  return `${m}/${d}/${y}`
}

const USERS_KEY = 'otd-users'

const fetchUsers = () => JSON.parse(localStorage.getItem(USERS_KEY))
const storeUsers = (users) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users))

function App() {
  const [users, setUsers] = useState(null)
  const [userName, setuserName] = useState('')

  useEffect(() => {
    const existingUsers = fetchUsers()
    if (existingUsers) {
      setUsers(existingUsers)
    }
  }, [])

  const createNewUser = () => {
    if (users) {
      const preexists = _.some(
        users,
        (user) => user.userName.toLowerCase() === userName.toLowerCase()
      )
      if (preexists) {
        alert(`Oops, a user name ${userName} already exists.`)
      } else {
        const id = _(users).map('id').orderBy().last() + 1
        const usersUpdate = users.concat([{ userName, id }])
        storeUsers(usersUpdate)
        setUsers(usersUpdate)
      }
    } else {
      const newUsers = [{ userName, id: 1 }]
      storeUsers(newUsers)
      setUsers(newUsers)
    }
  }

  const handleDelete = (id) => {
    const usersUpdate = _.filter(users, (user) => user.id !== id)
    storeUsers(usersUpdate)
    setUsers(usersUpdate)
  }

  return (
    <Stack
      width="100%"
      height="100vh"
      position="relative"
      background="whitesmoke"
    >
      <Header>
        <h1 css={css({ fontSize: '1rem' })}>Out the Door</h1>
        <Dropdown title="+" placement="bottom-end">
          <Stack padding="8px">
            <form onSubmit={createNewUser}>
              <Stack axis="vertical" gap="4px" alignment="end">
                <label htmlFor="new-user-name" />
                <input
                  onChange={(e) => setuserName(e.target.value)}
                  placeholder="Name"
                  type="text"
                  value={userName}
                  autoFocus
                />
                <Button type="submit">Create user</Button>
              </Stack>
            </form>
          </Stack>
        </Dropdown>
      </Header>
      <BodyGrid>
        {users &&
          users.map((user, i) => (
            <UserContainer key={i}>
              <p style={{ fontWeight: 500 }}>{user.userName}</p>
              <Button
                type="button"
                onClick={() => {
                  const confirmDelete = window.confirm(
                    `Are you sure you want to delete ${user.userName}? This can not be undone.`
                  )
                  if (confirmDelete) handleDelete(user.id)
                }}
              >
                delete
              </Button>
            </UserContainer>
          ))}
      </BodyGrid>
    </Stack>
  )
}

const Header = ({ children }) => (
  <Stack
    alignment="center"
    axis="horizontal"
    background="whitesmoke"
    borderBottom="1px solid lightgrey"
    distribution="space-between"
    padding="1rem"
    position="sticky"
    top="0"
    width="100%"
  >
    {children}
  </Stack>
)

const BodyGrid = ({ children }) => (
  <Grid
    columns="1fr 1fr"
    gap="1rem"
    gridAutoRows="max-content"
    grow
    height="100%"
    padding="1rem"
    width="100%"
  >
    {children}
  </Grid>
)

const UserContainer = ({ children }) => (
  <Stack
    axis="horizontal"
    background="white"
    boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
    borderRadius="3px"
    distribution="space-between"
    gap="1rem"
    height="15rem"
    padding="1rem"
  >
    {children}
  </Stack>
)

export default App
