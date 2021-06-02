import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'

import { shouldBePresent } from '~/asserters/commonAsserters'
import { DragObject, Props as TaskListItemProps } from '~/components/Reminder/TaskListItem'

export interface Props {
  children?: React.ReactElement<TaskListItemProps, React.ComponentType<TaskListItemProps>>
  index: number

  moveTask(sourceIndex: number, targetIndex: number): void
}

const TaskListItemDropTarget: React.FC<Props> = ({ children, index, moveTask }) => {
  const div = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop<DragObject, unknown, unknown>({
    accept: 'TaskListItem',
    hover(item, monitor) {
      shouldBePresent(div.current)

      if (item.index === index) {
        return
      }

      const clientOffset = monitor.getClientOffset()

      shouldBePresent(clientOffset)

      const boundingClientRect = div.current.getBoundingClientRect()
      const pointerY = clientOffset.y - boundingClientRect.top
      const middleY = (boundingClientRect.bottom - boundingClientRect.top) / 2

      // downwards
      if (item.index < index && pointerY < middleY) {
        return
      }

      // upwards
      if (item.index > index && pointerY > middleY) {
        return
      }

      moveTask(item.index, index)

      // tslint:disable-next-line:no-object-mutation
      item.index = index
    },
  })

  drop(div)

  return (
    <div ref={ div }>
      { children }
    </div>
  )
}

export default TaskListItemDropTarget
