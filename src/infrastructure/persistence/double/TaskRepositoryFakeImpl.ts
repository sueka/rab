import { List } from 'immutable'
import { injectable } from 'inversify'

import Task from '~/domain/entity/Task'
import TaskRepository from '~/domain/repository/TaskRepository'
import TaskId from '~/domain/vo/TaskId'
import shouldBePresent from '~/lib/shouldBePresent'

// TODO: namespace in localStorage
@injectable()
export default class TaskRepositoryFakeImpl implements TaskRepository {
  public async list() {
    const tasks = []

    for (let i = 0; i < localStorage.length; ++i) {
      const key = localStorage.key(i)

      shouldBePresent(key)

      const seriarized = localStorage.getItem(key)

      shouldBePresent(seriarized)

      let task: Task

      try {
        task = Task.deserialize(seriarized)
      } catch (error) {
        continue
      }

      tasks.push(task)
    }

    return List(tasks)
  }

  public async findById(taskId: TaskId) {
    const seriarized = localStorage.getItem(taskId.value)

    if (seriarized === null) {
      throw new Error // TODO:
    }

    return Task.deserialize(seriarized)
  }

  public async store(task: Task) {
    return localStorage.setItem(task.id.value, task.serialize())
  }

  public async remove(taskId: TaskId) {
    return localStorage.removeItem(taskId.value)
  }
}
