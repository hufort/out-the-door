import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import _ from 'lodash'
import { Check, UserPlus, UserX } from 'react-feather'
import { Button, Dropdown, Grid, Stack } from './components'
import { fetchUsers, storeUsers } from './api'

// DND
import { DndContext, useDroppable } from '@dnd-kit/core'

const makeDate = () => {
  const now = new Date()
  const m = now.getMonth()
  const d = now.getDate()
  const y = now.getFullYear()
  return `${m}/${d}/${y}`
}

const TASKS = [
  { id: 1, title: 'Make bed', icon: '🛏' },
  { id: 2, title: 'Get dressed', icon: '👕' },
  { id: 3, title: 'Backpack', icon: '🎒' },
  { id: 4, title: 'Water bottle', icon: '💧' },
  { id: 5, title: 'Lunch', icon: '🍱' },
  { id: 6, title: 'Shoes', icon: '👟' },
]

function App() {
  const [users, setUsers] = useState(null)
  const [name, setuserName] = useState('')

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
        (user) => user.name.toLowerCase() === name.toLowerCase()
      )
      if (preexists) {
        alert(`Oops, a user named ${name} already exists.`)
      } else {
        const maxId = _(users).map('id').orderBy().last()
        const usersUpdate = users.concat([{ name, id: maxId + 1 }])
        storeUsers(usersUpdate)
        setUsers(usersUpdate)
      }
    } else {
      const newUsers = [{ name, id: 1 }]
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
    <DndContext>
      <Stack
        width="100%"
        height="100vh"
        position="relative"
        background="whitesmoke"
      >
        <Header>
          <h1 css={{ fontSize: '1rem' }}>Out the Door</h1>
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
                    value={name}
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
        <Stack
          axis="horizontal"
          minHeight="100%"
          minWidth="0px"
          flex={1}
          width="100%"
          padding="1rem"
          gap="1rem"
        >
          <TaskSidebar tasks={TASKS} />
          <BodyGrid>
            {users &&
              users.map((user) => <UserContainer key={user.id} user={user} />)}
          </BodyGrid>
        </Stack>
      </Stack>
    </DndContext>
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

const TaskSidebar = ({ tasks }) => (
  <Stack
    axis="vertical"
    borderRadius="3px"
    distribution="space-between"
    gap="1rem"
    padding="0 1rem"
  >
    {tasks.map((task) => (
      <Stack
        width="3rem"
        height="3rem"
        background="white"
        alignment="center"
        distribution="center"
        borderRadius="3px"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
        key={task.id}
      >
        <p css={{ fontSize: '1.5rem' }}>{task.icon}</p>
      </Stack>
    ))}
  </Stack>
)

const BodyGrid = ({ children }) => (
  <Grid
    columns="1fr"
    gap="1rem"
    gridAutoRows="max-content"
    flex={1}
    height="100%"
    width="100%"
  >
    {children}
  </Grid>
)

const UserContainer = ({ children, user }) => {
  const [isHovering, setIsHovering] = useState(false)
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  })

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
      <p style={{ fontWeight: 500 }}>{user.name}</p>
      {isHovering && (
        <Button
          type="button"
          variant="naked"
          onClick={() => {
            const confirmDelete = window.confirm(
              `Are you sure you want to delete ${user.name}? This can not be undone.`
            )
            if (confirmDelete) handleDeleteUser(user.id)
          }}
        >
          <UserX color="#3D3D3D" size={16} />
        </Button>
      )}
    </Stack>
  )
}

export default App
