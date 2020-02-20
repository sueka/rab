import React, { useCallback } from 'react'
import { connect } from 'react-redux'

import Task from '~/domain/entity/Task'
import TaskId from '~/domain/vo/TaskId'
import curry from '~/lib/curry'
import { asBoolean, asObject, leftOnly, named } from '~/lib/validators/commonValidators'
import { asBoundedLengthString } from '~/lib/validators/stringValidators'
import { State } from '~/redux'
import { addTaskAsync, changeTaskContentAsync, deleteTaskAsync, markTaskAsDoneAsync, markTaskAsUndoneAsync, moveTask } from '~/redux/modules/reminder'
import AddTaskButton from './AddTaskButton'
import TaskList from './TaskList'
import TaskListItem from './TaskListItem'

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

const validate = asObject('a Task for presentation', (input) => ({
  content: leftOnly(named('content', asBoundedLengthString({
    upperBound: 140,
  })))(input.content),
  done: leftOnly(asBoolean)(input.done),
}))

const Reminder: React.FunctionComponent<Props> = ({ tasks, addTask, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask }) => {
  const changeTask = useCallback((taskId, { content, done }) => {
    if (content !== undefined) {
      changeTaskContent(taskId, content)
    }

    if (done !== undefined) {
      if (done) {
        markTaskAsDone(taskId)
      } else {
        markTaskAsUndone(taskId)
      }
    }
  }, [changeTaskContent, markTaskAsDone, markTaskAsUndone])

  return (
    <>
      <TaskList>
        {
          tasks.map((task, index) => (
            <TaskListItem
              key={ task.id.value }
              id={ task.id }
              value={ task }
              validate={ validate }
              onChange={ curry(changeTask)(task.id) }
              onDelete={ curry(deleteTask)(task.id) }
              { ...{ index, moveTask } }
            />
          ))
        }
      </TaskList>
      <AddTaskButton addTask={ addTask } />
    </>
  )
}

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
