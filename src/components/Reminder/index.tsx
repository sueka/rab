import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { OptionsObject, useSnackbar } from 'notistack'

import useOnceForEachEffect from '~/lib/hooks/useOnceForEachEffect'
import TaskId from '~/domain/vo/TaskId'
import Task from '~/domain/entity/Task'

import { State } from '~/redux'
import { addTaskAsync, changeTaskContentAsync, markTaskAsDoneAsync, markTaskAsUndoneAsync, deleteTaskAsync, moveTask, removeError } from '~/redux/modules/reminder'
import TaskList from './TaskList'
import AddTaskButton from './AddTaskButton'

// import messages from './messages'

interface StateProps {
  tasks: Task[]
  errors: Error[]
}

interface DispatchProps {
  addTask(): void
  changeTaskContent(taskId: TaskId, content: string): void
  markTaskAsDone(taskId: TaskId): void
  markTaskAsUndone(taskId: TaskId): void
  deleteTask(taskId: TaskId): void
  moveTask(source: number, dest: number): void
  removeError(error: Error): void
}

type Props =
  & StateProps
  & DispatchProps

const Reminder: React.FunctionComponent<Props> = ({ tasks, errors, addTask, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask, removeError }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const enqueuedSnackbarKeys = useRef<Array<OptionsObject['key']>>([])

  useOnceForEachEffect(errors, (error) => {
    const enqueuedSnackbarKey = enqueueSnackbar(error.message, {
      variant: 'error',
      onClose(_event, reason) {
        if (reason !== 'clickaway') {
          removeError(error)
        }
      },
    })

    if (enqueuedSnackbarKey !== null) {
      enqueuedSnackbarKeys.current.push(enqueuedSnackbarKey)
    }
  }, [errors])

  useEffect(() => () => {
    // tslint:disable-next-line:no-loop-statement
    for (const enqueuedSnackbarKey of enqueuedSnackbarKeys.current) {
      closeSnackbar(enqueuedSnackbarKey)
    }
  }, [])

  return (
    <>
      <TaskList { ...{ tasks, changeTaskContent, markTaskAsDone, markTaskAsUndone, deleteTask, moveTask } } />
      <AddTaskButton addTask={ addTask } />
    </>
  )
}

// connect

const mapStateToProps = ({ reminder: { tasks, errors } }: State): StateProps => ({
  tasks,
  errors,
})

const mapDispatchToProps: DispatchProps = {
  addTask: addTaskAsync,
  changeTaskContent: changeTaskContentAsync,
  markTaskAsDone: markTaskAsDoneAsync,
  markTaskAsUndone: markTaskAsUndoneAsync,
  deleteTask: deleteTaskAsync,
  moveTask,
  removeError,
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminder)
