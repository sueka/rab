import * as React from 'react'
import { DropTarget, ConnectDropTarget } from 'react-dnd'

import DraggableTaskListItem from './DraggableTaskListItem'
import { Props as TaskListItemProps } from './DraggableTaskListItem/TaskListItem'
import { DragObject } from './DraggableTaskListItem'

interface CollectedProps {
  connectDropTarget: ConnectDropTarget
}

export type Props =
  & TaskListItemProps
  & CollectedProps

const DroppableDraggableTaskListItem: React.FunctionComponent<Props> = ({ connectDropTarget, ...props }) => connectDropTarget(
  <div>
    <DraggableTaskListItem { ...props } />
  </div>
)

export default DropTarget<TaskListItemProps, CollectedProps>('TaskListItem', {
  hover(props, monitor) {
    const item: DragObject | null = monitor.getItem()

    if (item === null) {
      return
    }

    const destinationIndex = props.index

    if (item.index === destinationIndex) {
      return
    }

    props.moveTask(item.index, destinationIndex)

    // tslint:disable-next-line:no-object-mutation
    item.index = destinationIndex
  },
}, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(DroppableDraggableTaskListItem)
