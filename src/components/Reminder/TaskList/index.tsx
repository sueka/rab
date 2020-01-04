import React, { useCallback } from 'react'

import List from '@material-ui/core/List'

import TaskId from '~/domain/vo/TaskId'
import Task from '~/domain/entity/Task'
import TaskListItem, { Props as TaskListItemProps } from './TaskListItem'

export interface Props {
  tasks: Task[]

  changeTaskContent(taskId: TaskId, content: string): void
  markTaskAsDone(taskId: TaskId): void
  markTaskAsUndone(taskId: TaskId): void
  deleteTask(taskId: TaskId): void
  moveTask(sourceIndex: number, targetIndex: number): void
}

const TaskList: React.FunctionComponent<Props> = ({ tasks, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask }) => {
  const handleTaskChange = useCallback<TaskListItemProps['onChange']>((taskId, { content, done }) => {
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
            value={ task }
            onChange={ handleTaskChange }
            { ...{ index, deleteTask, moveTask } }
          />
        ))
      }
    </List>
  )
}
export default TaskList
