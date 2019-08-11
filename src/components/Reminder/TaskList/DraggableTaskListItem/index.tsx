import * as React from 'react'
import { DragSource, ConnectDragSource } from 'react-dnd'

import TaskId from 'src/domain/vo/TaskId'
import TaskListItem, { Props as TaskListItemProps } from 'src/components/Reminder/TaskList/TaskListItem'

import * as classes from './classes.css'

interface CollectedProps {
  connectDragSource: ConnectDragSource
  isDragging: boolean
}

export type Props =
  & TaskListItemProps
  & CollectedProps

export interface DragObject {
  id: TaskId
  index: number
}

const DraggableTaskListItem: React.FunctionComponent<Props> = ({ connectDragSource, isDragging, ...props }) => connectDragSource(
  <div className={ isDragging ? classes.DraggingDraggableTaskListItem : '' }>
    <TaskListItem { ...props } />
  </div>
)

export default DragSource<TaskListItemProps, CollectedProps>('TaskListItem', {
  beginDrag: ({ task: { id }, index }): DragObject => ({
    id,
    index,
  }),
}, (connect, monitor): CollectedProps => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(DraggableTaskListItem)
