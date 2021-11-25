import React, { useEffect, useReducer } from 'react'
import _ from 'lodash'
import { Check, Plus, Trash, UserPlus } from 'react-feather'
import {
  Box,
  Button,
  Draggable,
  Dropdown,
  Grid,
  Separator,
  Stack,
  Text,
} from './components'
import { getUsers, setUsers, makeToday, getToday, setToday } from './api'
import { DROPZONE_TYPE, TASK_STATUS, TASKS } from './constants'

// DND
import { DndContext, useDroppable } from '@dnd-kit/core'

const reducer = (state, action) => {
  let taskId, userId, currentUser

  switch (action.type) {
    case 'HANDLE_CHANGE':
      return { ...state, ...action.payload }
    case 'CREATE_USER':
      const { users, name } = state
      const maxId = _(users).map('id').orderBy().last() || 0
      const id = maxId + 1
      users[id] = {
        name: name,
        id,
        taskIdsCompleted: [],
        points: 0,
        todayCompleted: false,
      }
      return { ...state, name: '', users }
    case 'LOAD_USERS':
      return { ...state, users: action.payload }
    case 'MARK_TASK_COMPLETE':
      taskId = action.payload.taskId
      userId = action.payload.userId
      currentUser = state.users[userId]
      currentUser.taskIdsCompleted = currentUser.taskIdsCompleted.concat([
        taskId,
      ])
      return { ...state }
    case 'MARK_TASK_INCOMPLETE':
      taskId = action.payload.taskId
      userId = action.payload.userId
      currentUser = state.users[userId]
      currentUser.taskIdsCompleted = _.pull(
        currentUser.taskIdsCompleted,
        taskId
      )
      return { ...state }
    case 'MARK_ALL_COMPLETE':
      userId = action.payload.userId
      state.users[userId].points += 1
      return { ...state }
    case 'RESET_USERS_TODAY':
      _.forEach(state.users, (user) => {
        user.taskIdsCompleted = []
        user.todayCompleted = false
      })
      return { ...state }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { name: '', users: {} })

  // update users store on state change
  useEffect(() => {
    if (_.size(state.users)) setUsers(state.users)
  }, [state])

  // load users
  useEffect(() => {
    const existingUsers = getUsers()
    if (existingUsers) {
      dispatch({ type: 'LOAD_USERS', payload: existingUsers })
    }
  }, [])

  // reset user tasks completed and today date  on new day
  useEffect(() => {
    const today = makeToday()
    const todayStore = getToday()
    if (today !== todayStore) {
      dispatch({ type: 'RESET_USERS_TODAY' })
      setToday()
    }
  }, [])

  // const handleDeleteUser = (id) => {
  //   const usersUpdate = _.filter(users, (user) => user.id !== id)
  //   setUsers(usersUpdate)
  //   setUsers(usersUpdate)
  // }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (over) {
      const accepts = over.data.current.accepts
      let userId
      let taskId
      switch (accepts) {
        case TASK_STATUS.incomplete:
          userId = over.data.current.userId
          taskId = active.data.current.taskId
          if (
            !userId ||
            !taskId ||
            _.includes(state.users[userId].taskIdsCompleted, taskId)
          ) {
            break
          }

          dispatch({
            type: 'MARK_TASK_COMPLETE',
            payload: { userId, taskId },
          })

          if (
            state.users[userId].taskIdsCompleted.length ===
            Object.keys(TASKS).length
          ) {
            dispatch({ type: 'MARK_ALL_COMPLETE', payload: { userId } })
          }
          break
        case TASK_STATUS.complete:
          userId = active.data.current.userId
          taskId = active.data.current.taskId
          if (!userId || !taskId) break
          if (_.includes(state.users[userId].taskIdsCompleted, taskId)) {
            dispatch({
              type: 'MARK_TASK_INCOMPLETE',
              payload: { userId, taskId },
            })
          }
          break
        default:
          console.warn('Action not accepted')
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Stack width="100%" height="100vh" position="relative" bg="whitesmoke">
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
    bg="white"
    boxShadow={0}
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
    alignment="center"
    axis="vertical"
    borderColor="red"
    borderWidth={3}
    distribution="start"
    gap="1rem"
    height="100%"
    padding="1rem"
  >
    {_.map(tasks, (task) => (
      <TaskTileDraggable
        key={task.id}
        task={task}
        taskStatus={TASK_STATUS.incomplete}
      />
    ))}
    <Separator variant="horizontal" />
    <Dropzone
      accepts={TASK_STATUS.complete}
      borderColor="lightgrey"
      id="delete-completed-dropzone"
      dropzoneType={DROPZONE_TYPE.destroy}
    >
      <Trash color="lightgrey" size={18} />
    </Dropzone>
  </Stack>
)

const Dropzone = ({
  accepts,
  borderColor = 'whitesmoke',
  children,
  dropzoneData,
  id,
  minHeight = '3.25rem',
  minWidth = '3.25rem',
  dropzoneType = DROPZONE_TYPE.neutral,
  validateCanDrop = ({ draggable, droppable }) => true,
}) => {
  const { active, isOver, over, setNodeRef } = useDroppable({
    id,
    data: { accepts, ...dropzoneData },
  })

  // It feels like Dropzone it pobably doing too much here
  // Not sure it should be passing `draggable` back up in
  // validateCanDrop. It's also all just for rendering a
  // different color border. I have a hunch that dnd-kit
  // may provide a first class way to validate if a draggable
  // can be dropped or not.

  const draggable = active?.data?.current
  const droppable = over?.data?.current

  const doesAccept = _(accepts).includes(draggable?.type)
  const canDrop = doesAccept && validateCanDrop({ draggable, droppable })

  const getActiveBorderColor = () => {
    switch (dropzoneType) {
      case DROPZONE_TYPE.neutral:
        return 'separator'
      case DROPZONE_TYPE.create:
        return 'green'
      case DROPZONE_TYPE.destroy:
        return 'red'
      default:
        return 'separator'
    }
  }

  return (
    <Stack
      alignment="center"
      borderColor={isOver && canDrop ? getActiveBorderColor() : borderColor}
      borderRadius="6px"
      borderStyle="dashed"
      css={{
        minHeight,
        minWidth,
      }}
      borderWidth="2px"
      distribution="center"
      innerRef={setNodeRef}
    >
      {children}
    </Stack>
  )
}

const TaskTileDraggable = ({ task, taskStatus, userId }) => {
  const id = `${userId ? `user-${userId}-` : ''}draggable-task-id-${task.id}`
  const data = { taskId: task.id, type: taskStatus, userId }

  return (
    <Draggable data={data} id={id}>
      <TaskTile task={task} />
    </Draggable>
  )
}

const TaskTile = ({ task, isDragging }) => {
  return (
    <Box
      css={{
        transform: isDragging ? 'translateY(2px) rotate(2deg)' : undefined,
        transition: 'transform 50ms',
      }}
    >
      <Stack
        alignment="center"
        bg="white"
        borderRadius="6px"
        boxShadow={isDragging ? 4 : 2}
        css={{
          transform: isDragging ? ' scale(1.1)' : undefined,
          transition: 'transform 250ms',
        }}
        distribution="center"
        height="3rem"
        key={task.id}
        width="3rem"
      >
        <Text size={6}>{task.icon}</Text>
      </Stack>
    </Box>
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
  const tasksIdsCompleted = user.taskIdsCompleted
  const tasksIdsRemaining = _(TASKS)
    .map('id')
    .difference(tasksIdsCompleted)
    .value()

  return (
    <Stack
      axis="vertical"
      bg="white"
      borderRadius="6px"
      boxShadow={0}
      distribution="space-between"
      gap="1rem"
      padding="1rem"
    >
      <Stack alignment="center" axis="horizontal" gap="4px">
        <Text font="sans" size={2} weight="bold">
          {user.name}
        </Text>
        <Stack
          alignment="center"
          distribution="center"
          padding=".25rem .5rem"
          backgroundColor="blue"
          borderRadius={3}
        >
          <Text font="mono" color="white" size={0}>
            {user.points}
          </Text>
        </Stack>
      </Stack>
      <Stack axis="horizontal" gap="1rem" height="3rem">
        {_.map(tasksIdsCompleted, (taskId) => (
          <TaskTileDraggable
            userId={user.id}
            key={taskId}
            task={TASKS[taskId]}
            taskStatus={TASK_STATUS.complete}
          />
        ))}
        {tasksIdsRemaining.length ? (
          <Dropzone
            accepts={TASK_STATUS.incomplete}
            dropzoneData={{ userId: user.id }}
            dropzoneType={DROPZONE_TYPE.create}
            id={`user-id-${user.id}-task-dropzone`}
            validateCanDrop={({ draggable, droppable }) =>
              !_.includes(tasksIdsCompleted, draggable.taskId)
            }
          >
            <Plus color="lightgrey" size={18} />
          </Dropzone>
        ) : null}
      </Stack>
    </Stack>
  )
}

export default App
