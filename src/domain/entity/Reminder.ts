import { List } from 'immutable'

import Task from '~/domain/entity/Task'
import ReminderId from '~/domain/vo/ReminderId'
import Entity from './Entity'

interface ReminderRequest {
  id: ReminderId
  tasks: List<Task>
}

export default class Reminder extends Entity {
  private _tasks: List<Task>

  constructor({
    id,
    tasks,
  }: ReminderRequest) {
    super(id)

    this._tasks = tasks
  }

  public hashCode() {
    // tslint:disable-next-line:no-let
    let result = 17

    result = 31 * result + this.id.hashCode()
    result = 31 * result + this.tasks.hashCode()

    return result
  }

  public with({
    tasks = this.tasks,
  }: Partial<Alt.Omit<ReminderRequest, 'id'>>): Reminder {
    return new Reminder({ id: this.id as ReminderId, tasks }) // TODO
  }

  get tasks() {
    return this._tasks
  }

  set tasks(value) {
    this._tasks = value // tslint:disable-line:no-object-mutation
  }
}
