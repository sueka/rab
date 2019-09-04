import React from 'react'
import { DragObjectWithType, useDrag } from 'react-dnd'
import classnames from 'classnames'

import TaskId from 'src/domain/vo/TaskId'
import TaskListItem, { Props } from './TaskListItem'

import classes from './classes.css'

interface CollectedProps {
  dragging: boolean
}

export interface DragObject extends DragObjectWithType {
  id: TaskId
  index: number
}

const DraggableTaskListItem: React.FunctionComponent<Props> = (props) => {
  const [{ dragging }, drag] = useDrag<DragObject, {}, CollectedProps>({
    item: {
      type: 'TaskListItem',
      id: props.task.id,
      index: props.index,
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  })

  const className = React.useMemo(() => classnames({
    [classes.DraggingDraggableTaskListItem]: dragging,
  }), [dragging])

  return (
    <div ref={ drag } className={ className }>
      <TaskListItem { ...props } />
    </div>
  )
}

export default DraggableTaskListItem
