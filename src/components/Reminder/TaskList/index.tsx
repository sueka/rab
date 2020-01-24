import React, { useCallback } from 'react'

import List from '@material-ui/core/List'

import Task from '~/domain/entity/Task'
import TaskId from '~/domain/vo/TaskId'
import curry from '~/lib/curry'
import { asBoolean, asObject, leftOnly, named } from '~/lib/validators/commonValidators'
import { asBoundedLengthString } from '~/lib/validators/stringValidators'
import TaskListItem from './TaskListItem'

export interface Props {
  tasks: Task[]

  changeTaskContent(taskId: TaskId, content: string): void
  markTaskAsDone(taskId: TaskId): void
  markTaskAsUndone(taskId: TaskId): void
  deleteTask(taskId: TaskId): void
  moveTask(sourceIndex: number, targetIndex: number): void
}

const validate = asObject('a Task for presentation', (input) => ({
  content: leftOnly(named('content', asBoundedLengthString({
    upperBound: 140,
  })))(input.content),
  done: leftOnly(asBoolean)(input.done),
}))

const TaskList: React.FunctionComponent<Props> = ({ tasks, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask }) => {
  const handleTaskChange = useCallback((taskId, { content, done }) => {
    if (content !== undefined) {
      changeTaskContent(taskId, content)
    }

    if (done !== undefined) {
      if (done) {
        markTaskAsDone(taskId)
      } else {
        markTaskAsUndone(taskId)
      }
    }
  }, [changeTaskContent, markTaskAsDone, markTaskAsUndone])

  return (
    <List>
      {
        tasks.map((task, index) => (
          <TaskListItem
            key={ task.id.value }
            id={ task.id }
            value={ task }
            validate={ validate }
            onChange={ curry(handleTaskChange)(task.id) }
            deleteTask={ curry(deleteTask)(task.id) }
            { ...{ index, moveTask } }
          />
        ))
      }
    </List>
  )
}
export default TaskList
