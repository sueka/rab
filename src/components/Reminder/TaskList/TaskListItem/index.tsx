import React, { useRef, useMemo, useCallback } from 'react'
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd'
import { useIntl } from 'react-intl'
import classnames from 'classnames'
import Case from 'case'

import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'

import { isOneOf } from '~/lib/guards/commonGuards'
import ValidationError from '~/lib/validators/ValidationError'
import TaskId from '~/domain/vo/TaskId'
import Task from '~/domain/entity/Task'
import DeleteTaskButton from './DeleteTaskButton'

import classes from './classes.css'
import messages from './messages'

// TODO: remove
export type Validated<T, E extends Error = Error> = {
  value: T
  errors: E[]
}

export interface Props {
  id: TaskId
  value: {
    content: Validated<Task['content'], ValidationError>
    done: Validated<Task['done'], ValidationError>
  }
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

const TaskListItem: React.FunctionComponent<Props> = ({ id, value, index, onChange, deleteTask, moveTask }) => {
  const ref = useRef(null)

  const [{ dragging }, drag] = useDrag<DragObject, unknown, CollectedProps>({
    item: {
      type: 'TaskListItem',
      id,
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
    onChange(id, {
      content: event.currentTarget.value,
    })
  }, [onChange])

  const handleDoneChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, _checked: boolean) => {
    onChange(id, {
      done: event.target.checked,
    })
  }, [onChange])

  const handleDeleteTaskButtonClick = useCallback(() => {
    deleteTask(id)
  }, [deleteTask])

  const { formatMessage } = useIntl()

  const helperText = useMemo(() => {
    return value.content.errors.map((error) => {
      if (isOneOf(...Object.keys(messages))(error?.key)) {
        return Case.sentence(formatMessage(messages[error.key], error.values))
      }

      return null // TODO
    })
  }, [value.content.errors])

  return (
    <div ref={ ref }>
      <ListItem classes={ { container: className } }>
        <ListItemIcon>
          <Checkbox checked={ value.done.value } onChange={ handleDoneChange } />
        </ListItemIcon>
        <TextField
          value={ value.content.value }
          onChange={ handleContentChange }
          disabled={ value.done.value }
          error={ value.content.errors.length !== 0 }
          helperText={ helperText }
        />
        <ListItemSecondaryAction>
          <DeleteTaskButton onClick={ handleDeleteTaskButtonClick } />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  )
}

export default TaskListItem
