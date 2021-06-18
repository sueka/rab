import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import classnames from 'classnames'
import React, { useCallback, useMemo } from 'react'
import { DragObjectWithType, useDrag } from 'react-dnd'
import { useIntl } from 'react-intl'

import Task, { TaskParams } from '~/domain/entity/Task'
import classes from './classes.css'
import messages from './messages'

export interface Props {
  value: Task
  index: number

  onChange(value: Partial<TaskParams>): void
  onDelete(): void
  validate(input: Task): Partial<Record<keyof Task, Error>>
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

  const { formatMessage } = useIntl()

  const errors = useMemo(() => validate(value), [value, validate])
  const hasError = useMemo(() => Object.values<Error | undefined>(errors).some((error) => error !== undefined), [errors]) // TODO: Remove the type annotation

  const helperText = useMemo(() => {
    if (errors.content === undefined) {
      return null
    }

    const result = /.* is not between -Infinity and (?<upperBound>\d+) characters\./.exec(errors.content.message)

    if (result !== null && result.groups?.upperBound !== undefined) {
      return formatMessage(messages.enterInUpperBoundCharactersOrLess, result.groups)
    }

    return null // TODO
  }, [formatMessage, errors.content])

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
          <Checkbox
            color="primary" // NOTE: 選択コントロールには secondary を使うべきとされている (https://material.io/design/color/the-color-system.html) が、これは強調のためであって、リマインダーのチェックボックスは項目を強調するためのものではない。
            checked={ value.done }
            onChange={ handleDoneChange }
          />
        </ListItemIcon>
        <TextField
          variant="standard"
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
