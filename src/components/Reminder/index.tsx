import React from 'react'
import { connect } from 'react-redux'

import Task from '~/domain/entity/Task'
import TaskId from '~/domain/vo/TaskId'
import { State } from '~/redux'
import { addTaskAsync, changeTaskContentAsync, deleteTaskAsync, markTaskAsDoneAsync, markTaskAsUndoneAsync, moveTask } from '~/redux/modules/reminder'
import AddTaskButton from './AddTaskButton'
import TaskList from './TaskList'

interface StateProps {
  tasks: Task[]
}

interface DispatchProps {
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
    <AddTaskButton addTask={ addTask } />
  </>
)

// connect

const mapStateToProps = ({ reminder: { tasks } }: State): StateProps => ({
  tasks,
})

const mapDispatchToProps: DispatchProps = {
  addTask: addTaskAsync,
  changeTaskContent: changeTaskContentAsync,
  markTaskAsDone: markTaskAsDoneAsync,
  markTaskAsUndone: markTaskAsUndoneAsync,
  deleteTask: deleteTaskAsync,
  moveTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminder)
