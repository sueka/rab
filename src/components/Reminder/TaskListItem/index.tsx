import Case from 'case'
import classnames from 'classnames'
import React, { useCallback, useMemo } from 'react'
import { DragObjectWithType, useDrag } from 'react-dnd'
import { useIntl } from 'react-intl'

import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'
import DragHandleIcon from '@material-ui/icons/DragHandle'

import { Task } from '..'
import TaskId from '~/domain/vo/TaskId'
import { isOneOf } from '~/lib/guards/commonGuards'
import ValidationError from '~/lib/validators/ValidationError'
import DeleteTaskButton from './DeleteTaskButton'
import classes from './classes.css'
import messages from './messages'

export interface Props {
  value: Task
  index: number

  onChange(value: Partial<Task>): void
  onDelete(): void
  validate(input: Task): Partial<Record<keyof Task, ValidationError>>
}

interface CollectedProps {
  dragging: boolean
}

export interface DragObject extends DragObjectWithType {
  id: TaskId
  index: number
}

const TaskListItem: React.FunctionComponent<Props> = ({ value, index, onChange, onDelete, validate }) => {
  const [{ dragging }, drag, preview] = useDrag<DragObject, unknown, CollectedProps>({
    item: {
      type: 'TaskListItem',
      id: value.id,
      index,
    },
    isDragging: (monitor) => {
      const item: DragObject = monitor.getItem()

      return value.id.equals(item.id)
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  })

  const className = useMemo(() => classnames(classes.TaskListItemContainer, {
    [classes.Dragging]: dragging,
  }), [dragging])

  const handleContentChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    onChange({
      content: event.target.value,
    })
  }, [onChange])

  const handleDoneChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, _checked: boolean) => {
    onChange({
      done: event.target.checked,
    })
  }, [onChange])

  const { formatMessage } = useIntl()

  const errors = useMemo(() => validate(value), [value, validate])
  const hasError = useMemo(() => Object.values(errors).some((error) => error !== undefined), [errors])

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
    <div ref={ preview }>
      <ListItem
        classes={ {
          container: className,
          secondaryAction: classes.ListItemSecondaryAction,
        } }
      >
        <ListItemIcon>
          <div ref={ drag }>
            <DragHandleIcon />
          </div>
        </ListItemIcon>
        <ListItemIcon>
          <Checkbox checked={ value.done } onChange={ handleDoneChange } />
        </ListItemIcon>
        <TextField
          fullWidth
          value={ value.content }
          onChange={ handleContentChange }
          disabled={ value.done }
          error={ hasError }
          helperText={ helperText }
        />
        <ListItemSecondaryAction>
          <DeleteTaskButton onClick={ onDelete } />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  )
}

export default TaskListItem
