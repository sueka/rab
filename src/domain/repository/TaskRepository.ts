import TaskId from 'src/domain/vo/TaskId'
import Task from 'src/domain/entity/Task'

export default interface TaskRepository {
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
  remove(todoId: TaskId): Promise<void>
}
