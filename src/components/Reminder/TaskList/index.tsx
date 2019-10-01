import React from 'react'

import List from '@material-ui/core/List'

import TaskListItem from './TaskListItem'

import TaskId from '~/domain/vo/TaskId'
import Task from '~/domain/entity/Task'

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
        <TaskListItem
          key={ task.id.value }
          { ...{ task, index, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask } }
        />
      ))
    }
  </List>
)

export default TaskList
