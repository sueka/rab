import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import Case from 'case'
import classnames from 'classnames'
import React, { useCallback, useMemo } from 'react'
import { DragObjectWithType, useDrag } from 'react-dnd'
import { useIntl } from 'react-intl'

import Task, { TaskParams } from '~/domain/entity/Task'
import { isOneOf } from '~/lib/guards/commonGuards'
import ValidationError from '~/lib/validators/ValidationError'
import classes from './classes.css'
import messages from './messages'

export interface Props {
  value: Task
  index: number

  onChange(value: Partial<TaskParams>): void
  onDelete(): void
  validate(input: Task): Partial<Record<keyof Task, ValidationError>>
}

interface CollectedProps {
  dragging: boolean
}

export interface DragObject extends DragObjectWithType {
  value: Task
  index: number
}

const TaskListItem: React.FC<Props> = ({ value, index, onChange, onDelete, validate }) => {
  const [{ dragging }, drag, preview] = useDrag<DragObject, unknown, CollectedProps>({
    item: {
      type: 'TaskListItem',
      value,
      index,
    },
    isDragging: (monitor) => {
      const item: DragObject = monitor.getItem()

      return value.isIdenticalTo(item.value)
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

  const { formatMessage, locale } = useIntl()

  const errors = useMemo(() => validate(value), [value, validate])
  const hasError = useMemo(() => Object.values(errors).some((error) => error !== undefined), [errors])

  const helperText = useMemo(() => {
    if (errors.content === undefined) {
      return null
    }

    if (isOneOf(...Object.keys(messages))(errors.content.key)) {
      const text = formatMessage(messages[errors.content.key], errors.content.values)

      switch (locale) {
        case 'en': return Case.sentence(text)
        case 'ja':
        case 'he': return text
        default: throw new Error // TODO
      }
    }

    return null // TODO
  }, [locale, formatMessage, errors.content])

  return (
    <div ref={ preview }>
      <ListItem
        classes={ {
          container: className,
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
          <IconButton onClick={ onDelete } edge="end">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  )
}

export default TaskListItem
