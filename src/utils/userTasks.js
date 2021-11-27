import _ from 'lodash'
import { TASKS } from '../constants'

const getRemainingTaskIds = (user) =>
  _(TASKS).map('id').difference(user.taskIdsCompleted).value()

const validateAllTasksComplete = (user) => _.isEmpty(getRemainingTaskIds(user))

export { getRemainingTaskIds, validateAllTasksComplete }
