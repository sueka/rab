import React from 'react'
import { useDrop } from 'react-dnd'

import DraggableTaskListItem from './DraggableTaskListItem'
import { Props } from './DraggableTaskListItem/TaskListItem'
import { DragObject } from './DraggableTaskListItem'

const DroppableDraggableTaskListItem: React.FunctionComponent<Props> = (props) => {
  const [, drop] = useDrop<DragObject, {}, {}>({
    accept: 'TaskListItem',
    hover(item) {
      const destinationIndex = props.index

      if (item.index === destinationIndex) {
        return
      }

      props.moveTask(item.index, destinationIndex)

      // tslint:disable-next-line:no-object-mutation
      item.index = destinationIndex
    },
  })

  return (
    <div ref={ drop }>
      <DraggableTaskListItem { ...props } />
    </div>
  )
}

export default DroppableDraggableTaskListItem
