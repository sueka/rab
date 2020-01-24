import Case from 'case'
import classnames from 'classnames'
import React, { useCallback, useMemo, useRef } from 'react'
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd'
import { useIntl } from 'react-intl'

import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'

import Task from '~/domain/entity/Task'
import TaskId from '~/domain/vo/TaskId'
import { isOneOf } from '~/lib/guards/commonGuards'
import ValidationError from '~/lib/validators/ValidationError'
import DeleteTaskButton from './DeleteTaskButton'
import classes from './classes.css'
import messages from './messages'

export interface Props {
  id: TaskId
  value: Pick<Task, 'content' | 'done'>
  index: number

  onChange(taskId: TaskId, task: Partial<Task>): void
  deleteTask(taskId: TaskId): void
  moveTask(sourceIndex: number, targetIndex: number): void
  validate(input: Pick<Task, 'content' | 'done'>): Partial<Record<'content' | 'done', ValidationError>>
}

interface CollectedProps {
  dragging: boolean
}

interface DragObject extends DragObjectWithType {
  id: TaskId
  index: number
}

const TaskListItem: React.FunctionComponent<Props> = ({ id, value, index, onChange, deleteTask, moveTask, validate }) => {
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

  const errors = useMemo(() => validate(value), [value, validate])

  const helperText = useMemo(() => {
    if (errors.content === undefined) {
      return null
    }

    if (isOneOf(...Object.keys(messages))(errors.content.key)) {
      return Case.sentence(formatMessage(messages[errors.content.key], errors.content.values))
    }

    return null // TODO
  }, [errors.content])

  return (
    <div ref={ ref }>
      <ListItem
        classes={ {
          container: className,
          secondaryAction: classes.ListItemSecondaryAction,
        } }
      >
        <ListItemIcon>
          <Checkbox checked={ value.done } onChange={ handleDoneChange } />
        </ListItemIcon>
        <TextField
          fullWidth
          value={ value.content }
          onChange={ handleContentChange }
          disabled={ value.done }
          error={ errors.content !== undefined }
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
