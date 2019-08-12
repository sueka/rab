import * as React from 'react'
import { DragObjectWithType, useDrag } from 'react-dnd'

import TaskId from 'src/domain/vo/TaskId'
import TaskListItem, { Props } from './TaskListItem'

import * as classes from './classes.css'

interface CollectedProps {
  isDragging: boolean
}

export interface DragObject extends DragObjectWithType {
  id: TaskId
  index: number
}

const DraggableTaskListItem: React.FunctionComponent<Props> = (props) => {
  const [{ isDragging }, drag] = useDrag<DragObject, {}, CollectedProps>({
    item: {
      type: 'TaskListItem',
      id: props.task.id,
      index: props.index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div ref={ drag } className={ isDragging ? classes.DraggingDraggableTaskListItem : '' }>
      <TaskListItem { ...props } />
    </div>
  )
}

export default DraggableTaskListItem
