import React, { useEffect, useState, useReducer } from 'react'
import _ from 'lodash'
import { Check, UserPlus } from 'react-feather'
import { Button, Dropdown, Grid, Stack } from './components'
import { fetchUsers, storeUsers } from './api'

// DND
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const makeDate = () => {
  const now = new Date()
  const m = now.getMonth()
  const d = now.getDate()
  const y = now.getFullYear()
  return `${m}${d}${y}`
}

const TASKS = {
  1: { id: 1, title: 'Make bed', icon: '🛏' },
  2: { id: 2, title: 'Get dressed', icon: '👕' },
  3: { id: 3, title: 'Backpack', icon: '🎒' },
  4: { id: 4, title: 'Water bottle', icon: '💧' },
  5: { id: 5, title: 'Lunch', icon: '🍱' },
  6: { id: 6, title: 'Shoes', icon: '👟' },
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_CHANGE':
      return { ...state, ...action.payload }
    case 'CREATE_USER':
      const { users, name } = state
      const maxId = _(users).map('id').orderBy().last() || 0
      const id = maxId + 1
      users[id] = { name: name, id, tasksCompleted: [] }
      return { ...state, name: '', users }
    case 'LOAD_USERS':
      return { ...state, users: action.payload }
    case 'TASK_COMPLETED':
      const { taskId, userId } = action.payload
      const currentUser = state.users[userId]
      currentUser.tasksCompleted = currentUser.tasksCompleted.concat([taskId])
      return { ...state }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { name: '', users: {} })
  console.log('state', state)

  useEffect(() => {
    if (_.size(state.users)) storeUsers(state.users)
  }, [state])

  useEffect(() => {
    const existingUsers = fetchUsers()
    if (existingUsers) {
      dispatch({ type: 'LOAD_USERS', payload: existingUsers })
    }
  }, [])

  // const handleDeleteUser = (id) => {
  //   const usersUpdate = _.filter(users, (user) => user.id !== id)
  //   storeUsers(usersUpdate)
  //   setUsers(usersUpdate)
  // }

  const handleDragEnd = (event) => {
    if (event.over) {
      const userId = event.over.id.split('-').pop()
      const taskId = event.active.id.split('-').pop()
      return _.includes(state.users[userId].tasksCompleted, taskId)
        ? null
        : dispatch({ type: 'TASK_COMPLETED', payload: { userId, taskId } })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const { users, name } = state
                  const preexists = _.some(
                    users,
                    (user) => user.name.toLowerCase() === name.toLowerCase()
                  )
                  if (preexists) {
                    return alert(
                      `Uh oh, it looks like a user named ${name} already exists`
                    )
                  }
                  return dispatch({ type: 'CREATE_USER' })
                }}
              >
                <Stack axis="vertical" gap="8px" alignment="end">
                  <label htmlFor="new-user-name" />
                  <input
                    onChange={(e) =>
                      dispatch({
                        type: 'HANDLE_CHANGE',
                        payload: { name: e.target.value },
                      })
                    }
                    placeholder="Name"
                    type="text"
                    value={state.name}
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
          gap="1rem"
        >
          <TaskSidebar tasks={TASKS} />
          <BodyGrid>
            {_.map(state.users, (user) => (
              <UserContainer key={user.id} user={user} users={state.users} />
            ))}
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
    distribution="start"
    flex={1}
    gap="1rem"
    height="100%"
    padding="1rem"
  >
    {_.map(tasks, (task) => (
      <TaskTile key={task.id} task={task} />
    ))}
  </Stack>
)

const TaskTile = ({ task, userId }) => {
  const id = `${userId ? `user-${userId}-` : ''}draggable-task-id-${task.id}`
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  const TaskTile = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <Stack
      alignment="center"
      background="white"
      borderRadius="6px"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
      css={TaskTile}
      distribution="center"
      height="3rem"
      innerRef={setNodeRef}
      key={task.id}
      width="3rem"
      cursor="grab"
      {...listeners}
      {...attributes}
    >
      <p css={{ fontSize: '1.5rem' }}>{task.icon}</p>
    </Stack>
  )
}

const BodyGrid = ({ children }) => (
  <Grid
    columns="1fr"
    flex={1}
    gap="1rem"
    gridAutoRows="max-content"
    height="100%"
    padding="1rem"
    width="100%"
  >
    {children}
  </Grid>
)

const UserContainer = ({ user }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-user-id-${user.id}`,
  })

  return (
    <Stack
      axis="vertical"
      background="white"
      borderRadius="6px"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
      distribution="space-between"
      gap="1rem"
      innerRef={setNodeRef}
      padding="1rem"
      css={{
        borderColor: isOver ? 'darkseagreen' : 'transparent',
        borderWidth: '2px',
        width: '100%',
      }}
    >
      <p style={{ fontWeight: 500 }}>{user.name}</p>
      <Stack axis="horizontal" gap="1rem" height="3rem">
        {_.map(user.tasksCompleted, (taskId) => (
          <TaskTile userId={user.id} key={taskId} task={TASKS[taskId]} />
        ))}
      </Stack>
    </Stack>
  )
}

export default App
