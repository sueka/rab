import { injectable } from 'inversify'

import TaskId from '~/domain/vo/TaskId'
import Task from '~/domain/entity/Task'
import TaskRepository from '~/domain/repository/TaskRepository'

@injectable()
export default class TaskRepositoryFakeImpl implements TaskRepository {
  public async findById(taskId: TaskId) {
    const task = localStorage.getItem(taskId.value)

    if (task === null) {
      throw new Error // TODO:
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
