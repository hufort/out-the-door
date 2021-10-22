import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { Dropdown, Stack, Grid } from './components'
import _ from 'lodash'

const makeDate = () => {
  const now = new Date()
  const m = now.getMonth()
  const d = now.getDate()
  const y = now.getFullYear()
  return `${m}/${d}/${y}`
}

function App() {
  const [users, setUsers] = useState(null)
  const [userName, setuserName] = useState('')

  useEffect(() => {
    const existingUsers = localStorage.getItem('otd-users')
    if (existingUsers) {
      setUsers(JSON.parse(existingUsers))
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
        localStorage.setItem('otd-users', JSON.stringify(usersUpdate))
        setUsers(usersUpdate)
      }
    } else {
      const newUsers = [{ userName, id: 1 }]
      localStorage.setItem('otd-users', JSON.stringify(newUsers))
      setUsers(newUsers)
    }
  }

  return (
    <Stack width="100%" height="100vh" position="relative">
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
                <button type="submit">Create user</button>
              </Stack>
            </form>
          </Stack>
        </Dropdown>
      </Header>
      <BodyGrid>
        {users &&
          users.map((user, i) => (
            <UserContainer key={i}>
              <p style={{ color: 'white', fontWeight: 500 }}>{user.userName}</p>
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
    background="white"
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
  <Stack background="tomato" borderRadius="3px" height="15rem" padding="1rem">
    {children}
  </Stack>
)

export default App
