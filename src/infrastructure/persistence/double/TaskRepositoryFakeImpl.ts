import { List } from 'immutable'
import { injectable } from 'inversify'

import Task from '~/domain/entity/Task'
import TaskRepository from '~/domain/repository/TaskRepository'
import TaskId from '~/domain/vo/TaskId'
import shouldBePresent from '~/lib/shouldBePresent'

@injectable()
export default class TaskRepositoryFakeImpl implements TaskRepository {
  public async list() {
    const tasks = []

    for (let i = 0; i < localStorage.length; ++i) {
      const key = localStorage.key(i)

      shouldBePresent(key)

      const item = localStorage.getItem(key)

      shouldBePresent(item)

      tasks.push(Task.deserialize(item))
    }

    return List(tasks)
  }

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
