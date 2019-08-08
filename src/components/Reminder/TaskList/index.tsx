import * as React from 'react'

import List from '@material-ui/core/List'

import TaskListItem from './TaskListItem'

import TaskId from 'src/domain/vo/TaskId'
import Task from 'src/domain/entity/Task'

export interface Props {
  tasks: Task[]

  changeTaskContent(taskId: TaskId, content: string): void
  markTaskAsDone(taskId: TaskId): void
  markTaskAsUndone(taskId: TaskId): void
  deleteTask(taskId: TaskId): void
}

const TaskList: React.FunctionComponent<Props> = ({ tasks, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask }) => (
  <List>
    {
      tasks.map((task) => (
        <TaskListItem
          key={ task.id.value }
          { ...{ task, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask } }
        />
      ))
    }
  </List>
)

export default TaskList
