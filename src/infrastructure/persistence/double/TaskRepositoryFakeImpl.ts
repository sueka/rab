import { List } from 'immutable'
import { injectable } from 'inversify'

import { shouldBePresent } from '~/asserters/commonAsserters'
import Task from '~/domain/entity/Task'
import TaskRepository from '~/domain/repository/TaskRepository'
import TaskId from '~/domain/vo/TaskId'

// TODO: Create namespace in localStorage
@injectable()
export default class TaskRepositoryFakeImpl implements TaskRepository {
  public async list() {
    const tasks = []

    // tslint:disable-next-line:no-loop-statement no-let
    for (let i = 0; i < localStorage.length; ++i) {
      const key = localStorage.key(i)

      shouldBePresent(key)

      const seriarized = localStorage.getItem(key)

      shouldBePresent(seriarized)

      // tslint:disable-next-line:no-let
      let task: Task

      try {
        task = Task.deserialize(seriarized)
      } catch (error: unknown) {
        continue
      }

      // tslint:disable-next-line:no-array-mutation
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

  public async remove(task: Task) {
    return localStorage.removeItem(task.id.value)
  }
}
