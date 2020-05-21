import { List } from 'immutable'

import Task from '~/domain/entity/Task'
import TaskId from '~/domain/vo/TaskId'

export default interface TaskRepository {
  list(): Promise<List<Task>>

  /**
   * @throws {Error} if not found.
   */
  findById(todoId: TaskId): Promise<Task>

  /**
   * @throws {Error} if failed to store.
   */
  store(todo: Task): Promise<void>

  /**
   * @throws {Error} if not found.
   */
  remove(todoId: Task): Promise<void>
}
