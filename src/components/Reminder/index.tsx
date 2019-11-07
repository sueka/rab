import React from 'react'
import { connect } from 'react-redux'

import TaskId from '~/domain/vo/TaskId'
import Task from '~/domain/entity/Task'

import { State } from '~/redux'
import { addTaskAsync, changeTaskContentAsync, markTaskAsDoneAsync, markTaskAsUndoneAsync, deleteTaskAsync, moveTask } from '~/redux/modules/reminder'
import TaskList from './TaskList'
import AddTaskButton from './AddTaskButton'

// import messages from './messages'

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
    <AddTaskButton { ...{ addTask } } />
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
