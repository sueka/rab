import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { injectable, inject } from 'inversify'
import assert from 'assert'

import { LogicError } from '~/lib/errors'
import typed from '~/lib/typed'
import { takeEvery } from '~/lib/boni/redux-saga/effects'
import TaskId from '~/domain/vo/TaskId'
import Task from '~/domain/entity/Task'
import TaskRepository from '~/domain/repository/TaskRepository'
import { State } from '~/redux'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

export interface ReminderState {
  tasks: Task[]
  errors: Error[]
}

//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//   _|
// _|_|_|_|  _|    _|  _|_|_|      _|_|      _|_|_|
//   _|      _|    _|  _|    _|  _|_|_|_|  _|_|
//   _|      _|    _|  _|    _|  _|            _|_|
//     _|_|    _|_|_|  _|_|_|      _|_|_|  _|_|_|
//                 _|  _|
//             _|_|    _|

export /* for testing */ const ADD_TASK_ASYNC = '@@react-app-prototype/reminder/ADD_TASK_ASYNC'
export /* for testing */ const CHANGE_TASK_CONTENT_ASYNC = '@@react-app-prototype/reminder/CHANGE_TASK_CONTENT_ASYNC'
export /* for testing */ const MARK_TASK_AS_DONE_ASYNC = '@@react-app-prototype/reminder/MARK_TASK_AS_DONE_ASYNC'
export /* for testing */ const MARK_TASK_AS_UNDONE_ASYNC = '@@react-app-prototype/reminder/MARK_TASK_AS_UNDONE_ASYNC'
export /* for testing */ const DELETE_TASK_ASYNC = '@@react-app-prototype/reminder/DELETE_TASK_ASYNC'
export /* for testing */ const MOVE_TASK = '@@react-app-prototype/reminder/MOVE_TASK' // TODO: rename?
export /* for testing */ const PUSH_TASK = '@@react-app-prototype/reminder/PUSH_TASK'
export /* for testing */ const REMOVE_TASK = '@@react-app-prototype/reminder/REMOVE_TASK'
export /* for testing */ const CHECK_TASK = '@@react-app-prototype/reminder/CHECK_TASK'
export /* for testing */ const PUSH_ERROR = '@@react-app-prototype/reminder/PUSH_ERROR'
const REMOVE_ERROR = '@@react-app-prototype/reminder/REMOVE_ERROR'

const reminderActionTypes = [
  ADD_TASK_ASYNC,
  CHANGE_TASK_CONTENT_ASYNC,
  MARK_TASK_AS_DONE_ASYNC,
  MARK_TASK_AS_UNDONE_ASYNC,
  DELETE_TASK_ASYNC,
  MOVE_TASK,
  PUSH_TASK,
  REMOVE_TASK,
  CHECK_TASK,
  PUSH_ERROR,
  REMOVE_ERROR,
]

interface AddTaskAsyncAction extends Action<typeof ADD_TASK_ASYNC> {}

interface ChangeTaskContentAsyncAction extends Action<typeof CHANGE_TASK_CONTENT_ASYNC> {
  payload: {
    taskId: TaskId
    content: Task['content']
  }
}

interface MarkTaskAsDoneAsyncAction extends Action<typeof MARK_TASK_AS_DONE_ASYNC> {
  payload: {
    taskId: TaskId
  }
}

interface MarkTaskAsUndoneAsyncAction extends Action<typeof MARK_TASK_AS_UNDONE_ASYNC> {
  payload: {
    taskId: TaskId
  }
}

interface DeleteTaskAsyncAction extends Action<typeof DELETE_TASK_ASYNC> {
  payload: {
    taskId: TaskId
  }
}

interface MoveTaskAction extends Action<typeof MOVE_TASK> {
  payload: {
    sourceIndex: number
    targetIndex: number
  }
}

interface PushTaskAction extends Action<typeof PUSH_TASK> {
  payload: {
    task: Task
  }
}

interface RemoveTaskAction extends Action<typeof REMOVE_TASK> {
  payload: {
    taskId: TaskId
  }
}

interface CheckTaskAction extends Action<typeof CHECK_TASK> {
  payload: {
    taskId: TaskId
    task: Task
  }
}

interface PushErrorAction extends Action<typeof PUSH_ERROR> {
  payload: {
    error: Error
  }
}

interface RemoveErrorAction extends Action<typeof REMOVE_ERROR> {
  payload: {
    error: Error // TODO: id
  }
}

export type ReminderAction =
  | AddTaskAsyncAction
  | ChangeTaskContentAsyncAction
  | MarkTaskAsDoneAsyncAction
  | MarkTaskAsUndoneAsyncAction
  | DeleteTaskAsyncAction
  | MoveTaskAction
  | PushTaskAction
  | RemoveTaskAction
  | CheckTaskAction
  | PushErrorAction
  | RemoveErrorAction

function isReminderAction(action: Action): action is ReminderAction {
  return reminderActionTypes.includes(action.type)
}

//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//                                           _|
//   _|_|_|  _|  _|_|    _|_|      _|_|_|  _|_|_|_|    _|_|    _|  _|_|    _|_|_|
// _|        _|_|      _|_|_|_|  _|    _|    _|      _|    _|  _|_|      _|_|
// _|        _|        _|        _|    _|    _|      _|    _|  _|            _|_|
//   _|_|_|  _|          _|_|_|    _|_|_|      _|_|    _|_|    _|        _|_|_|
//
//

export const addTaskAsync = (): AddTaskAsyncAction => ({
  type: ADD_TASK_ASYNC,
})

export const changeTaskContentAsync = (taskId: TaskId, content: string): ChangeTaskContentAsyncAction => ({
  type: CHANGE_TASK_CONTENT_ASYNC,
  payload: {
    taskId,
    content,
  },
})

export const markTaskAsDoneAsync = (taskId: TaskId): MarkTaskAsDoneAsyncAction => ({
  type: MARK_TASK_AS_DONE_ASYNC,
  payload: {
    taskId,
  },
})

export const markTaskAsUndoneAsync = (taskId: TaskId): MarkTaskAsUndoneAsyncAction => ({
  type: MARK_TASK_AS_UNDONE_ASYNC,
  payload: {
    taskId,
  },
})

export const deleteTaskAsync = (taskId: TaskId): DeleteTaskAsyncAction => ({
  type: DELETE_TASK_ASYNC,
  payload: {
    taskId,
  },
})

export const moveTask = (sourceIndex: number, targetIndex: number): MoveTaskAction => ({
  type: MOVE_TASK,
  payload: {
    sourceIndex,
    targetIndex,
  },
})

export const pushTask = (task: Task): PushTaskAction => ({
  type: PUSH_TASK,
  payload: {
    task,
  },
})

export const removeTask = (taskId: TaskId): RemoveTaskAction => ({
  type: REMOVE_TASK,
  payload: {
    taskId,
  },
})

export const checkTask = (taskId: TaskId, task: Task): CheckTaskAction => ({
  type: CHECK_TASK,
  payload: {
    taskId,
    task,
  },
})

export /* for testing */ const pushError = (error: Error): PushErrorAction => ({
  type: PUSH_ERROR,
  payload: {
    error,
  },
})

export const removeError = (error: Error): RemoveErrorAction => ({
  type: REMOVE_ERROR,
  payload: {
    error,
  },
})

//
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

export const createReminderReducer: (initialState: ReminderState) => Reducer<ReminderState, Action> = (initialState) => (state = initialState, action) => {
  if (!isReminderAction(action)) {
    return state
  }

  switch (action.type) {
    case ADD_TASK_ASYNC: return state
    case CHANGE_TASK_CONTENT_ASYNC: {
      const i = state.tasks.findIndex((task) => task.id.equals(action.payload.taskId))

      if (i === -1) {
        throw new Error // TODO:
      }

      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, i),
          state.tasks[i].with({ content: action.payload.content }),
          ...state.tasks.slice(i + 1),
        ],
      }
    }
    case MARK_TASK_AS_DONE_ASYNC: {
      const i = state.tasks.findIndex((task) => task.id.equals(action.payload.taskId))

      if (i === -1) {
        throw new Error // TODO:
      }

      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, i),
          state.tasks[i].with({ done: true }),
          ...state.tasks.slice(i + 1),
        ],
      }
    }
    case MARK_TASK_AS_UNDONE_ASYNC: {
      const i = state.tasks.findIndex((task) => task.id.equals(action.payload.taskId))

      if (i === -1) {
        throw new Error // TODO:
      }

      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, i),
          state.tasks[i].with({ done: false }),
          ...state.tasks.slice(i + 1),
        ],
      }
    }
    case DELETE_TASK_ASYNC: return state
    case MOVE_TASK: {
      const restTasks = [
        ...state.tasks.slice(0, action.payload.sourceIndex),
        ...state.tasks.slice(action.payload.sourceIndex + 1),
      ]

      return {
        ...state,
        tasks: [
          ...restTasks.slice(0, action.payload.targetIndex),
          state.tasks[action.payload.sourceIndex],
          ...restTasks.slice(action.payload.targetIndex),
        ],
      }
    }
    case PUSH_TASK: return {
      ...state,
      tasks: [
        ...state.tasks,
        action.payload.task,
      ],
    }
    case REMOVE_TASK: {
      const i = state.tasks.findIndex((task) => task.id.equals(action.payload.taskId))

      if (i === -1) {
        throw new Error // TODO:
      }

      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, i),
          ...state.tasks.slice(i + 1),
        ],
      }
    }
    case CHECK_TASK: {
      assert(action.payload.taskId.equals(action.payload.task.id))

      return state
    }
    case PUSH_ERROR: return {
      ...state,
      errors: [
        ...state.errors,
        action.payload.error,
      ],
    }
    case REMOVE_ERROR: {
      if (!state.errors.includes(action.payload.error)) {
        throw new Error // TODO:
      }

      return {
        ...state,
        errors: state.errors.filter((error) => error !== action.payload.error),
      }
    }
  }
}

//
//                     _|                        _|
//   _|_|_|    _|_|    _|    _|_|      _|_|_|  _|_|_|_|    _|_|    _|  _|_|    _|_|_|
// _|_|      _|_|_|_|  _|  _|_|_|_|  _|          _|      _|    _|  _|_|      _|_|
//     _|_|  _|        _|  _|        _|          _|      _|    _|  _|            _|_|
// _|_|_|      _|_|_|  _|    _|_|_|    _|_|_|      _|_|    _|_|    _|        _|_|_|
//
//

const selectTasks = ({ reminder: { tasks } }: State) => tasks

//
//                                           _|
//   _|_|_|    _|_|    _|  _|_|  _|      _|        _|_|_|    _|_|
// _|_|      _|_|_|_|  _|_|      _|      _|  _|  _|        _|_|_|_|
//     _|_|  _|        _|          _|  _|    _|  _|        _|
// _|_|_|      _|_|_|  _|            _|      _|    _|_|_|    _|_|_|
//
//

@injectable()
export class ReminderService {
  @inject('TaskRepository') public taskRepository!: TaskRepository

  private *addTaskAsyncSaga(): SagaIterator {
    const task = new Task({})

    yield call(this.taskRepository.store, task)
    yield put(pushTask(task))
  }

  private *changeTaskContentAsyncSaga({ payload: { taskId, content } }: ChangeTaskContentAsyncAction): SagaIterator {
    const task: ResultType<ReturnType<this['taskRepository']['findById']>> = yield call(this.taskRepository.findById, taskId)

    try {
      task.content = content // tslint:disable-line:no-object-mutation
    } catch (error) {
      if (error instanceof Error) {
        yield put(pushError(error))

        return
      }

      throw new TypeError(typed<[string]>`${ String(error) } is not an error.`)
    }

    yield call(this.taskRepository.store, task)
    yield put(checkTask(taskId, task))
  }

  private *markTaskAsDoneAsyncSaga({ payload: { taskId } }: MarkTaskAsDoneAsyncAction): SagaIterator {
    const task: ResultType<ReturnType<this['taskRepository']['findById']>> = yield call(this.taskRepository.findById, taskId)

    task.done = true // tslint:disable-line:no-object-mutation

    yield call(this.taskRepository.store, task)
    yield put(checkTask(taskId, task))
  }

  private *markTaskAsUndoneAsyncSaga({ payload: { taskId } }: MarkTaskAsUndoneAsyncAction): SagaIterator {
    const task: ResultType<ReturnType<this['taskRepository']['findById']>> = yield call(this.taskRepository.findById, taskId)

    task.done = false // tslint:disable-line:no-object-mutation

    yield call(this.taskRepository.store, task)
    yield put(checkTask(taskId, task))
  }

  private *deleteTaskAsyncSaga({ payload: { taskId } }: DeleteTaskAsyncAction): SagaIterator {
    yield call(this.taskRepository.remove, taskId)
    yield put(removeTask(taskId))
  }

  private *checkTaskSaga({ payload: { taskId, task } }: CheckTaskAction): SagaIterator {
    const stateTasks: ReturnType<typeof selectTasks> = yield select(selectTasks)

    const stateTask = stateTasks.find(({ id }) => id.equals(taskId))

    if (stateTask === undefined) {
      throw new Error // TODO:
    }

    if (!stateTask.equals(task)) {
      yield put(pushError(new LogicError)) // TODO:
    }
  }

  public *rootSaga(): SagaIterator {
    yield takeEvery(ADD_TASK_ASYNC, [this, this.addTaskAsyncSaga])
    yield takeEvery(CHANGE_TASK_CONTENT_ASYNC, [this, this.changeTaskContentAsyncSaga])
    yield takeEvery(MARK_TASK_AS_DONE_ASYNC, [this, this.markTaskAsDoneAsyncSaga])
    yield takeEvery(MARK_TASK_AS_UNDONE_ASYNC, [this, this.markTaskAsUndoneAsyncSaga])
    yield takeEvery(DELETE_TASK_ASYNC, [this, this.deleteTaskAsyncSaga])
    yield takeEvery(CHECK_TASK, [this, this.checkTaskSaga])
  }
}
