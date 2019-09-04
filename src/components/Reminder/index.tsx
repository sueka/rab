import React from 'react'

import TaskId from 'src/domain/vo/TaskId'
import Task from 'src/domain/entity/Task'

import TaskList from './TaskList'
import AddTaskButton from './AddTaskButton'

// import messages from './messages'

export interface StateProps {
  tasks: Task[]
}

export interface DispatchProps {
  addTask(): void
  changeTaskContent(taskId: TaskId, content: string): void
  markTaskAsDone(taskId: TaskId): void
  markTaskAsUndone(taskId: TaskId): void
  deleteTask(taskId: TaskId): void
  moveTask(source: number, dest: number): void
}

type Props =
  & StateProps
  & DispatchProps

const Reminder: React.FunctionComponent<Props> = ({ tasks, addTask, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask }) => (
  <>
    <TaskList { ...{ tasks, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask } } />
    <AddTaskButton { ...{ addTask } } />
  </>
)

export default Reminder
