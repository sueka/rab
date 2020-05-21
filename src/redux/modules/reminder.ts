import assert from 'assert'
import { List, Map } from 'immutable'
import { inject, injectable } from 'inversify'
import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { v4 } from 'uuid'

import Task from '~/domain/entity/Task'
import TaskRepository from '~/domain/repository/TaskRepository'
import TaskId from '~/domain/vo/TaskId'
import { takeEvery } from '~/lib/boni/redux-saga/effects'
import LogicError from '~/lib/errors/LogicError'
import typed from '~/lib/typed'
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
  tasks: List<Task>
  errors: Map<string, Error> // id -> error
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

const GET_TASKS_ASYNC = '@@react-app-prototype/reminder/GET_TASKS_ASYNC'
const SET_TASKS = '@@react-app-prototype/reminder/SET_TASKS'
export /* for testing */ const ADD_TASK_ASYNC = '@@react-app-prototype/reminder/ADD_TASK_ASYNC'
export /* for testing */ const CHANGE_TASK_CONTENT_ASYNC = '@@react-app-prototype/reminder/CHANGE_TASK_CONTENT_ASYNC'
export /* for testing */ const MARK_TASK_AS_DONE_ASYNC = '@@react-app-prototype/reminder/MARK_TASK_AS_DONE_ASYNC'
export /* for testing */ const MARK_TASK_AS_UNDONE_ASYNC = '@@react-app-prototype/reminder/MARK_TASK_AS_UNDONE_ASYNC'
export /* for testing */ const DELETE_TASK_ASYNC = '@@react-app-prototype/reminder/DELETE_TASK_ASYNC'
export /* for testing */ const MOVE_TASK = '@@react-app-prototype/reminder/MOVE_TASK' // TODO: rename?
export /* for testing */ const PUSH_TASK = '@@react-app-prototype/reminder/PUSH_TASK'
export const MARK_TASK_AS_DONE = '@@react-app-prototype/reminder/MARK_TASK_AS_DONE'
export const MARK_TASK_AS_UNDONE = '@@react-app-prototype/reminder/MARK_TASK_AS_UNDONE'
export /* for testing */ const REMOVE_TASK = '@@react-app-prototype/reminder/REMOVE_TASK'
export /* for testing */ const CHECK_TASK = '@@react-app-prototype/reminder/CHECK_TASK'
export /* for testing */ const PUSH_ERROR = '@@react-app-prototype/reminder/PUSH_ERROR'
const REMOVE_ERROR = '@@react-app-prototype/reminder/REMOVE_ERROR'

const reminderActionTypes = [
  GET_TASKS_ASYNC,
  SET_TASKS,
  ADD_TASK_ASYNC,
  CHANGE_TASK_CONTENT_ASYNC,
  MARK_TASK_AS_DONE_ASYNC,
  MARK_TASK_AS_UNDONE_ASYNC,
  DELETE_TASK_ASYNC,
  MOVE_TASK,
  PUSH_TASK,
  MARK_TASK_AS_DONE,
  MARK_TASK_AS_UNDONE,
  REMOVE_TASK,
  CHECK_TASK,
  PUSH_ERROR,
  REMOVE_ERROR,
]

type GetTasksAsyncAction = ReturnType<typeof getTasksAsync>
type SetTasksAction = ReturnType<typeof setTasks>
type AddTaskAsyncAction = ReturnType<typeof addTaskAsync>
type ChangeTaskContentAsyncAction = ReturnType<typeof changeTaskContentAsync>
type MarkTaskAsDoneAsyncAction = ReturnType<typeof markTaskAsDoneAsync>
type MarkTaskAsUndoneAsyncAction = ReturnType<typeof markTaskAsUndoneAsync>
type DeleteTaskAsyncAction = ReturnType<typeof deleteTaskAsync>
type MoveTaskAction = ReturnType<typeof moveTask>
type PushTaskAction = ReturnType<typeof pushTask>
type MarkTaskAsDoneAction = ReturnType<typeof markTaskAsDone>
type MarkTaskAsUndoneAction = ReturnType<typeof markTaskAsUndone>
type RemoveTaskAction = ReturnType<typeof removeTask>
type CheckTaskAction = ReturnType<typeof checkTask>
type PushErrorAction = ReturnType<typeof pushError>
type RemoveErrorAction = ReturnType<typeof removeError>

export type ReminderAction =
  | GetTasksAsyncAction
  | SetTasksAction
  | AddTaskAsyncAction
  | ChangeTaskContentAsyncAction
  | MarkTaskAsDoneAsyncAction
  | MarkTaskAsUndoneAsyncAction
  | DeleteTaskAsyncAction
  | MoveTaskAction
  | PushTaskAction
  | MarkTaskAsDoneAction
  | MarkTaskAsUndoneAction
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

export const getTasksAsync = () => <const> ({
  type: GET_TASKS_ASYNC,
})

const setTasks = (tasks: List<Task>) => <const> ({
  type: SET_TASKS,
  payload: {
    tasks,
  },
})

export const addTaskAsync = () => <const> ({
  type: ADD_TASK_ASYNC,
})

export const changeTaskContentAsync = (taskId: TaskId, content: string) => <const> ({
  type: CHANGE_TASK_CONTENT_ASYNC,
  payload: {
    taskId,
    content,
  },
})

export const markTaskAsDoneAsync = (taskId: TaskId) => <const> ({
  type: MARK_TASK_AS_DONE_ASYNC,
  payload: {
    taskId,
  },
})

export const markTaskAsUndoneAsync = (taskId: TaskId) => <const> ({
  type: MARK_TASK_AS_UNDONE_ASYNC,
  payload: {
    taskId,
  },
})

export const deleteTaskAsync = (taskId: TaskId) => <const> ({
  type: DELETE_TASK_ASYNC,
  payload: {
    taskId,
  },
})

export const moveTask = (sourceIndex: number, targetIndex: number) => <const> ({
  type: MOVE_TASK,
  payload: {
    sourceIndex,
    targetIndex,
  },
})

export const pushTask = (task: Task) => <const> ({
  type: PUSH_TASK,
  payload: {
    task,
  },
})

export const markTaskAsDone = (taskId: TaskId) => <const> ({
  type: MARK_TASK_AS_DONE,
  payload: {
    taskId,
  },
})

export const markTaskAsUndone = (taskId: TaskId) => <const> ({
  type: MARK_TASK_AS_UNDONE,
  payload: {
    taskId,
  },
})

export const removeTask = (taskId: TaskId) => <const> ({
  type: REMOVE_TASK,
  payload: {
    taskId,
  },
})

export const checkTask = (taskId: TaskId, task: Task) => <const> ({
  type: CHECK_TASK,
  payload: {
    taskId,
    task,
  },
})

export /* for testing */ const pushError = (errorId: string, error: Error) => <const> ({
  type: PUSH_ERROR,
  payload: {
    errorId,
    error,
  },
})

export const removeError = (errorId: string) => <const> ({
  type: REMOVE_ERROR,
  payload: {
    errorId,
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
    case GET_TASKS_ASYNC: return state
    case SET_TASKS: return {
      ...state,
      tasks: action.payload.tasks,
    }
    case ADD_TASK_ASYNC: return state
    case CHANGE_TASK_CONTENT_ASYNC: {
      // NOTE: CHANGE_TASK_CONTENT_ASYNC から発生する状態遷移と非同期のデータ書き込みを分離させると、このモジュールを使用する <input> は、内容が変更されるたびに再レンダリングされ、 IME とうまく相互作用しなくなる。

      const i = state.tasks.findIndex((task) => task.id.equals(action.payload.taskId))

      if (i === -1) {
        throw new Error // TODO:
      }

      return {
        ...state,
        tasks: state.tasks.update(i, (task) => task.with({ content: action.payload.content })),
      }
    }
    case MARK_TASK_AS_DONE_ASYNC: return state
    case MARK_TASK_AS_UNDONE_ASYNC: return state
    case DELETE_TASK_ASYNC: return state
    case MOVE_TASK: {
      const object = state.tasks.get(action.payload.sourceIndex)

      if (object === undefined) {
        throw new Error // TODO
      }

      return {
        ...state,
        tasks: state.tasks.remove(action.payload.sourceIndex).insert(action.payload.targetIndex, object),
      }
    }
    case PUSH_TASK: return {
      ...state,
      tasks: state.tasks.push(action.payload.task),
    }
    case MARK_TASK_AS_DONE: {
      const i = state.tasks.findIndex((task) => task.id.equals(action.payload.taskId))

      if (i === -1) {
        throw new Error // TODO:
      }

      return {
        ...state,
        tasks: state.tasks.update(i, (task) => task.with({ done: true })),
      }
    }
    case MARK_TASK_AS_UNDONE: {
      const i = state.tasks.findIndex((task) => task.id.equals(action.payload.taskId))

      if (i === -1) {
        throw new Error // TODO:
      }

      return {
        ...state,
        tasks: state.tasks.update(i, (task) => task.with({ done: false })),
      }
    }
    case REMOVE_TASK: {
      const i = state.tasks.findIndex((task) => task.id.equals(action.payload.taskId))

      if (i === -1) {
        throw new Error // TODO:
      }

      return {
        ...state,
        tasks: state.tasks.remove(i),
      }
    }
    case CHECK_TASK: {
      assert(action.payload.taskId.equals(action.payload.task.id))

      return state
    }
    case PUSH_ERROR: return {
      ...state,
      errors: state.errors.set(action.payload.errorId, action.payload.error),
    }
    case REMOVE_ERROR: {
      if (!(action.payload.errorId in state.errors)) {
        throw new Error // TODO:
      }

      return {
        ...state,
        errors: state.errors.remove(action.payload.errorId),
      }
    }
  }
}

//
//                                           _|
//   _|_|_|    _|_|    _|  _|_|  _|      _|        _|_|_|    _|_|
// _|_|      _|_|_|_|  _|_|      _|      _|  _|  _|        _|_|_|_|
//     _|_|  _|        _|          _|  _|    _|  _|        _|
// _|_|_|      _|_|_|  _|            _|      _|    _|_|_|    _|_|_|
//
//

@injectable()
export default class ReminderService {
  constructor(
    @inject('TaskRepository') public taskRepository: TaskRepository
  ) {}

  private *getTasksAsyncSaga(): SagaIterator {
    const tasks: ResultType<ReturnType<this['taskRepository']['list']>> = yield call(this.taskRepository.list)

    yield put(setTasks(tasks))
  }

  private *addTaskAsyncSaga(): SagaIterator {
    const task = new Task({
      id: new TaskId(v4()),
      content: '',
      done: false,
    })

    yield call(this.taskRepository.store, task)
    yield put(pushTask(task))
  }

  private *changeTaskContentAsyncSaga({ payload: { taskId, content } }: ChangeTaskContentAsyncAction): SagaIterator {
    const task: ResultType<ReturnType<this['taskRepository']['findById']>> = yield call(this.taskRepository.findById, taskId)

    try {
      task.content = content // tslint:disable-line:no-object-mutation
    } catch (error) {
      if (error instanceof Error) {
        yield put(pushError(v4(), error)) // TODO:

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
    yield put(markTaskAsDone(taskId))
  }

  private *markTaskAsUndoneAsyncSaga({ payload: { taskId } }: MarkTaskAsUndoneAsyncAction): SagaIterator {
    const task: ResultType<ReturnType<this['taskRepository']['findById']>> = yield call(this.taskRepository.findById, taskId)

    task.done = false // tslint:disable-line:no-object-mutation

    yield call(this.taskRepository.store, task)
    yield put(markTaskAsUndone(taskId))
  }

  private *deleteTaskAsyncSaga({ payload: { taskId } }: DeleteTaskAsyncAction): SagaIterator {
    const task: ResultType<ReturnType<this['taskRepository']['findById']>> = yield call(this.taskRepository.findById, taskId)

    yield call(this.taskRepository.remove, task)
    yield put(removeTask(taskId))
  }

  private *checkTaskSaga({ payload: { taskId, task } }: CheckTaskAction): SagaIterator {
    const { reminder: { tasks: stateTasks } }: State = yield select()

    const stateTask = stateTasks.find(({ id }) => id.equals(taskId))

    if (stateTask === undefined) {
      throw new Error // TODO:
    }

    if (!stateTask.equals(task)) {
      yield put(pushError(v4(), new LogicError)) // TODO:
    }
  }

  public *rootSaga(): SagaIterator {
    yield takeEvery(GET_TASKS_ASYNC, [this, this.getTasksAsyncSaga])
    yield takeEvery(ADD_TASK_ASYNC, [this, this.addTaskAsyncSaga])
    yield takeEvery(CHANGE_TASK_CONTENT_ASYNC, [this, this.changeTaskContentAsyncSaga])
    yield takeEvery(MARK_TASK_AS_DONE_ASYNC, [this, this.markTaskAsDoneAsyncSaga])
    yield takeEvery(MARK_TASK_AS_UNDONE_ASYNC, [this, this.markTaskAsUndoneAsyncSaga])
    yield takeEvery(DELETE_TASK_ASYNC, [this, this.deleteTaskAsyncSaga])
    yield takeEvery(CHECK_TASK, [this, this.checkTaskSaga])
  }
}
