import React from 'react'
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd'
import classnames from 'classnames'

import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'

import DeleteTaskButton from './DeleteTaskButton'

import TaskId from '~/domain/vo/TaskId'
import Task from '~/domain/entity/Task'

import classes from './classes.css'

interface Props {
  task: Task
  index: number

  changeTaskContent(taskId: TaskId, content: string): void
  markTaskAsDone(taskId: TaskId): void
  markTaskAsUndone(taskId: TaskId): void
  deleteTask(taskId: TaskId): void
  moveTask(sourceIndex: number, destinationIndex: number): void
}

interface CollectedProps {
  dragging: boolean
}

interface DragObject extends DragObjectWithType {
  id: TaskId
  index: number
}

const TaskListItem: React.FunctionComponent<Props> = ({ task, index, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask }) => {
  const ref = React.useRef(null)

  const [{ dragging }, drag] = useDrag<DragObject, unknown, CollectedProps>({
    item: {
      type: 'TaskListItem',
      id: task.id,
      index,
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop<DragObject, unknown, unknown>({
    accept: 'TaskListItem',
    hover(item) {
      const destinationIndex = index

      if (item.index === destinationIndex) {
        return
      }

      moveTask(item.index, destinationIndex)

      // tslint:disable-next-line:no-object-mutation
      item.index = destinationIndex
    },
  })

  drop(drag(ref))

  const className = React.useMemo(() => classnames(classes.TaskListItem, {
    [classes.Dragging]: dragging,
  }), [dragging])

  const handleContentChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    changeTaskContent(task.id, event.currentTarget.value)
  }, [])

  const handleDoneChange = React.useCallback(() => {
    if (task.done) {
      markTaskAsUndone(task.id)
    } else {
      markTaskAsDone(task.id)
    }
  }, [task.done])

  const handleDeleteTaskButtonClick = React.useCallback(() => {
    deleteTask(task.id)
  }, [])

  return (
    <div ref={ ref }>
      <ListItem className={ className }>
        <ListItemIcon>
          <Checkbox checked={ task.done } onChange={ handleDoneChange } />
        </ListItemIcon>
        <TextField value={ task.content } onChange={ handleContentChange } disabled={ task.done } />
        <ListItemSecondaryAction>
          <DeleteTaskButton onClick={ handleDeleteTaskButtonClick } />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  )
}

export default TaskListItem
