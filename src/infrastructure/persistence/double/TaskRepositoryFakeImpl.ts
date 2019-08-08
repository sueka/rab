import { injectable } from 'inversify'

import TaskId from 'src/domain/vo/TaskId'
import Task from 'src/domain/entity/Task'
import TaskRepository from 'src/domain/repository/TaskRepository'

@injectable()
export default class TaskRepositoryFakeImpl implements TaskRepository {
  // TODO: constructor(prefix)

  public async findById(taskId: TaskId) {
    const task = localStorage.getItem(taskId.value)

    if (task === null) {
      throw new Error() // TODO:
    }

    return Task.deserialize(task)
  }

  public async store(task: Task) {
    return localStorage.setItem(task.id.value, task.serialize())
  }

  public async remove(taskId: TaskId) {
    return localStorage.removeItem(taskId.value)
  }
}
