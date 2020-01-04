import React, { useRef, useMemo, useCallback } from 'react'
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd'
import classnames from 'classnames'

import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'

import TaskId from '~/domain/vo/TaskId'
import Task from '~/domain/entity/Task'
import DeleteTaskButton from './DeleteTaskButton'

import classes from './classes.css'

export interface Props {
  value: Task
  index: number

  onChange(taskId: TaskId, task: Partial<Task>): void
  deleteTask(taskId: TaskId): void
  moveTask(sourceIndex: number, targetIndex: number): void
}

interface CollectedProps {
  dragging: boolean
}

interface DragObject extends DragObjectWithType {
  id: TaskId
  index: number
}

const TaskListItem: React.FunctionComponent<Props> = ({ value, index, onChange, deleteTask, moveTask }) => {
  const ref = useRef(null)

  const [{ dragging }, drag] = useDrag<DragObject, unknown, CollectedProps>({
    item: {
      type: 'TaskListItem',
      id: value.id,
      index,
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop<DragObject, unknown, unknown>({
    accept: 'TaskListItem',
    hover(item) {
      const targetIndex = index

      if (item.index === targetIndex) {
        return
      }

      moveTask(item.index, targetIndex)

      // tslint:disable-next-line:no-object-mutation
      item.index = targetIndex
    },
  })

  drop(drag(ref))

  const className = useMemo(() => classnames(classes.TaskListItemContainer, {
    [classes.Dragging]: dragging,
  }), [dragging])

  const handleContentChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    onChange(value.id, {
      content: event.currentTarget.value,
    })
  }, [onChange])

  const handleDoneChange = useCallback(() => {
    onChange(value.id, {
      done: !value.done,
    })
  }, [value.done, onChange])

  const handleDeleteTaskButtonClick = useCallback(() => {
    deleteTask(value.id)
  }, [deleteTask])

  return (
    <div ref={ ref }>
      <ListItem classes={ { container: className } }>
        <ListItemIcon>
          <Checkbox checked={ value.done } onChange={ handleDoneChange } />
        </ListItemIcon>
        <TextField value={ value.content } onChange={ handleContentChange } disabled={ value.done } />
        <ListItemSecondaryAction>
          <DeleteTaskButton onClick={ handleDeleteTaskButtonClick } />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  )
}

export default TaskListItem
