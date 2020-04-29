import React from 'react'
import { useDrop } from 'react-dnd'

import { DragObject, Props as TaskListItemProps } from '~/components/Reminder/TaskListItem'

export interface Props {
  children?: React.ReactElement<TaskListItemProps, React.ComponentType<TaskListItemProps>>
  index: number

  moveTask(sourceIndex: number, targetIndex: number): void
}

const TaskListItemDropTarget: React.FunctionComponent<Props> = ({ children, index, moveTask }) => {
  const [, drop] = useDrop<DragObject, unknown, unknown>({
    accept: 'TaskListItem',
    hover(item) {
      if (item.index === index) {
        return
      }

      moveTask(item.index, index)

      // tslint:disable-next-line:no-object-mutation
      item.index = index
    },
  })

  return (
    <div ref={ drop }>
      { children }
    </div>
  )
}

export default TaskListItemDropTarget
