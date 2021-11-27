import _ from 'lodash'
import { TASKS } from '../constants'

const getRemainingTaskIds = (user) =>
  _(TASKS).map('id').difference(user.taskIdsCompleted).value()

const userCompletedAllTasks = (user) => _.isEmpty(getRemainingTaskIds(user))

const userCompletedTask = (user, taskId) =>
  _.includes(user.taskIdsCompleted, taskId)

export { getRemainingTaskIds, userCompletedAllTasks, userCompletedTask }
