import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { Dropdown, Flex, Grid } from './components'

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
      console.log('existingUsers', existingUsers)
      setUsers(JSON.parse(existingUsers))
    }
  }, [])

  const createNewUser = () => {
    if (users) {
      if (users.filter(userName) > -1) {
        alert(`Oops, a user name ${userName} already exists.`)
      } else {
        const usersUpdate = users.concat([userName])
        localStorage.setItem('otd-users', JSON.stringify(usersUpdate))
        setUsers(usersUpdate)
      }
    } else {
      localStorage.setItem('otd-users', JSON.stringify([userName]))
      setUsers([userName])
    }
  }

  return (
    <Flex width="100%" height="100vh" position="relative">
      <Header>
        <h1 css={css({ fontSize: '1rem' })}>Out the Door</h1>
        <Dropdown title="+" placement="bottom-end">
          <Flex padding="8px">
            <form onSubmit={createNewUser}>
              <Flex axis="vertical" gap="4px" alignment="end">
                <label htmlFor="new-user-name" />
                <input
                  onChange={(e) => setuserName(e.target.value)}
                  placeholder="Name"
                  type="text"
                  value={userName}
                  autoFocus
                />
                <button type="submit">Create user</button>
              </Flex>
            </form>
          </Flex>
        </Dropdown>
      </Header>
      <BodyGrid>
        {users &&
          users.map((user, i) => <UserContainer key={i}>{user}</UserContainer>)}
      </BodyGrid>
    </Flex>
  )
}

const Header = ({ children }) => (
  <Flex
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
  </Flex>
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
  <Flex background="tomato" borderRadius="3px" height="15rem">
    {children}
  </Flex>
)

export default App
