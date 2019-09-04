import React from 'react'

import List from '@material-ui/core/List'

import DroppableDraggableTaskListItem from './DroppableDraggableTaskListItem'

import TaskId from 'src/domain/vo/TaskId'
import Task from 'src/domain/entity/Task'

export interface Props {
  tasks: Task[]

  changeTaskContent(taskId: TaskId, content: string): void
  markTaskAsDone(taskId: TaskId): void
  markTaskAsUndone(taskId: TaskId): void
  deleteTask(taskId: TaskId): void
  moveTask(sourceIndex: number, destinationIndex: number): void
}

const TaskList: React.FunctionComponent<Props> = ({ tasks, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask }) => (
  <List>
    {
      tasks.map((task, index) => (
        <DroppableDraggableTaskListItem
          key={ task.id.value }
          { ...{ task, index, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask } }
        />
      ))
    }
  </List>
)

export default TaskList
