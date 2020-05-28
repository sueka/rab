import { List } from 'immutable'

import Task from '~/domain/entity/Task'
import TaskId from '~/domain/vo/TaskId'

export default interface TaskRepository {
  list(): Promise<List<Task>>

  /**
   * @throws {Error} if not found.
   */
  findById(taskId: TaskId): Promise<Task>

  /**
   * @throws {Error} if failed to store.
   */
  store(task: Task): Promise<void>

  /**
   * @throws {Error} if not found.
   */
  remove(taskId: Task): Promise<void>
}
