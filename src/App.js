import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import _ from 'lodash'
import { Check, UserPlus, UserX } from 'react-feather'
import { Button, Dropdown, Grid, Stack } from './components'
import { fetchUsers, storeUsers } from './api'

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
    const existingUsers = fetchUsers()
    if (existingUsers) {
      setUsers(existingUsers)
    }
  }, [])

  const handleCreateUser = () => {
    if (users) {
      const preexists = _.some(
        users,
        (user) => user.userName.toLowerCase() === userName.toLowerCase()
      )
      if (preexists) {
        alert(`Oops, a user name ${userName} already exists.`)
      } else {
        const maxId = _(users).map('id').orderBy().last()
        const usersUpdate = users.concat([{ userName, id: maxId + 1 }])
        storeUsers(usersUpdate)
        setUsers(usersUpdate)
      }
    } else {
      const newUsers = [{ userName, id: 1 }]
      storeUsers(newUsers)
      setUsers(newUsers)
    }
  }

  const handleDeleteUser = (id) => {
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
        <Dropdown
          title={<UserPlus color="white" size={16} />}
          placement="bottom-end"
        >
          <Stack padding="8px">
            <form onSubmit={handleCreateUser}>
              <Stack axis="vertical" gap="8px" alignment="end">
                <label htmlFor="new-user-name" />
                <input
                  onChange={(e) => setuserName(e.target.value)}
                  placeholder="Name"
                  type="text"
                  value={userName}
                  autoFocus
                  style={{ padding: '4px 8px' }}
                />
                <Button type="submit">
                  <Check color="white" size={16} />
                </Button>
              </Stack>
            </form>
          </Stack>
        </Dropdown>
      </Header>
      <BodyGrid>
        {users &&
          users.map((user, i) => (
            <UserContainer key={i}>
              {(isHovering) => (
                <>
                  <p style={{ fontWeight: 500 }}>{user.userName}</p>
                  {isHovering && (
                    <Button
                      type="button"
                      variant="naked"
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          `Are you sure you want to delete ${user.userName}? This can not be undone.`
                        )
                        if (confirmDelete) handleDeleteUser(user.id)
                      }}
                    >
                      <UserX color="#3D3D3D" size={16} />
                    </Button>
                  )}
                </>
              )}
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
    boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
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

const UserContainer = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Stack
      axis="horizontal"
      background="white"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
      borderRadius="3px"
      distribution="space-between"
      gap="1rem"
      height="15rem"
      padding="1rem"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {typeof children === 'function' ? children(isHovering) : children}
    </Stack>
  )
}

export default App
