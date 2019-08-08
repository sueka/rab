import * as React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'

import TaskId from 'src/domain/vo/TaskId'
import Task from 'src/domain/entity/Task'
import DeleteTaskButton from './DeleteTaskButton'

export interface Props {
  task: Task

  changeTaskContent(taskId: TaskId, content: string): void
  markTaskAsDone(taskId: TaskId): void
  markTaskAsUndone(taskId: TaskId): void
  deleteTask(taskId: TaskId): void
}

const TaskListItem: React.FunctionComponent<Props> = ({ task, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask }) => {
  const handleContentChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    changeTaskContent(task.id, event.currentTarget.value)
  }, [])

  const handleDoneChange = React.useCallback(() => {
    if (task.done) {
      markTaskAsUndone(task.id)
    } else {
      markTaskAsDone(task.id)
    }
  }, [task])

  const handleDeleteTaskButtonClick = React.useCallback(() => {
    deleteTask(task.id)
  }, [])

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox checked={ task.done } onChange={ handleDoneChange } />
      </ListItemIcon>
      <TextField value={ task.content } onChange={ handleContentChange } />
      <ListItemSecondaryAction>
        <DeleteTaskButton onClick={ handleDeleteTaskButtonClick } />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TaskListItem
