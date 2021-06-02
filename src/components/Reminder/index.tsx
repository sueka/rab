import { List } from 'immutable'
import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'

import curry from '~/curry'
import Task, { TaskParams } from '~/domain/entity/Task'
import TaskId from '~/domain/vo/TaskId'
import { State } from '~/redux'
import { addTaskAsync, changeTaskContentAsync, deleteTaskAsync, getTasksAsync, markTaskAsDoneAsync, markTaskAsUndoneAsync, moveTask } from '~/redux/modules/reminder'
import { asBoolean, asObject, leftOnly } from '~/validators/commonValidators'
import { asBoundedLengthString } from '~/validators/stringValidators'
import AddTaskButton from './AddTaskButton'
import TaskList from './TaskList'
import TaskListItem from './TaskListItem'
import TaskListItemDropTarget from './TaskListItemDropTarget'

interface StateProps {
  tasks: List<Task>
}

interface DispatchProps {
  getTasks(): void
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

/**
 * @throws [[Error]] if {input} is nullish.
 */
const validate = asObject((input) => ({
  content: leftOnly(asBoundedLengthString({ upperBound: 140 }))(input.content),
  done: leftOnly(asBoolean)(input.done),
}))

const Reminder: React.FC<Props> = ({ tasks, getTasks, addTask, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask }) => {
  useEffect(() => {
    getTasks()
  }, [getTasks])

  const changeTask = useCallback((taskId: TaskId, { content, done }: Partial<Alt.Omit<TaskParams, 'id'>>) => {
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
            <TaskListItemDropTarget
              key={ index }
              index={ index }
              moveTask={ moveTask }
            >
              <TaskListItem
                key={ task.id.value }
                value={ task }
                index={ index }
                onChange={ curry(changeTask)(task.id) }
                onDelete={ curry(deleteTask)(task.id) }
                validate={ validate }
              />
            </TaskListItemDropTarget>
          )).toArray()
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
  getTasks: getTasksAsync,
  addTask: addTaskAsync,
  changeTaskContent: changeTaskContentAsync,
  markTaskAsDone: markTaskAsDoneAsync,
  markTaskAsUndone: markTaskAsUndoneAsync,
  deleteTask: deleteTaskAsync,
  moveTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminder)
